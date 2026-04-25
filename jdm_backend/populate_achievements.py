import os
import shutil
import django
from django.core.files import File

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jdm_backend.settings")
django.setup()

from core.models import Achievement, HomePageContent

def populate():
    home = HomePageContent.objects.first()
    if not home:
        print("No HomePageContent found!")
        return

    print("Clearing old achievements from home...")
    Achievement.objects.filter(home=home).delete()

    achievements_data = [
        {"count": 207, "suffix": "+", "prefix": "", "title": "Active Team", "icon_path": "public/assets/img/icon/team.svg"},
        {"count": 1170, "suffix": "+", "prefix": "", "title": "Active Client Base", "icon_path": "public/assets/img/icon/clientbase.svg"},
        {"count": 17234830, "suffix": "", "prefix": "$", "title": "Annual Cargo Handled", "icon_path": "public/assets/img/icon/30.svg"},
        {"count": 1334.36, "suffix": "", "prefix": "", "title": "Annual Air Tonnage **(Freight)**", "icon_path": "public/assets/img/icon/31.svg"},
        {"count": 4068.94, "suffix": "", "prefix": "", "title": "Annual LCL CBM **(Freight)**", "icon_path": "public/assets/img/icon/32.svg"},
        {"count": 5246, "suffix": "+", "prefix": "", "title": "Annual TEUs **(Freight)**", "icon_path": "public/assets/img/icon/33.svg"},
        {"count": 38651, "suffix": "+", "prefix": "", "title": "Annual Customs Brokerage **(Air)**", "icon_path": "public/assets/img/icon/28.svg"},
        {"count": 1722, "suffix": "+", "prefix": "", "title": "Annual Customs Brokerage **(LCL)**", "icon_path": "public/assets/img/icon/27.svg"},
        {"count": 6033, "suffix": "+", "prefix": "", "title": "Annual Customs Brokerage **(TEUs)**", "icon_path": "public/assets/img/icon/15.svg"}
    ]

    frontend_dir = r"c:\Users\Administrator\Desktop\JDM\jdm_full_stack_website\jdm_frontend"

    for i, data in enumerate(achievements_data):
        ach = Achievement(
            home=home,
            count=data["count"],
            suffix=data["suffix"],
            prefix=data["prefix"],
            title=data["title"]
        )
        
        icon_full_path = os.path.join(frontend_dir, os.path.normpath(data["icon_path"]))
        
        if os.path.exists(icon_full_path):
            with open(icon_full_path, 'rb') as f:
                file_name = os.path.basename(icon_full_path)
                ach.icon.save(file_name, File(f), save=False)
            print(f"Added icon for {data['title']}")
        else:
            print(f"Warning: Icon not found at {icon_full_path}")
            
        ach.save()

    print(f"Added {len(achievements_data)} achievements!")

if __name__ == "__main__":
    populate()
