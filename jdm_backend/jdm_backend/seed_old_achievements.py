import os
import django
import shutil
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from django.conf import settings
from core.models import HomePageContent, Achievement

def seed():
    # Setup paths
    base_dir = Path(__file__).resolve().parent
    frontend_icon_dir = base_dir.parent.parent / 'jdm_frontend' / 'public' / 'assets' / 'img' / 'icon'
    media_achievement_dir = Path(settings.MEDIA_ROOT) / 'achievements'
    
    os.makedirs(media_achievement_dir, exist_ok=True)
    
    # 9 Old achievements data
    old_achievements = [
        {
            "count": 207,
            "suffix": "+",
            "title": "Active Team",
            "icon_name": "team.svg",
            "delay": ".2s"
        },
        {
            "count": 1170,
            "suffix": "+",
            "title": "Active Client Base",
            "icon_name": "clientbase.svg",
            "delay": ".4s"
        },
        {
            "prefix": "$",
            "count": 17234830,
            "title": "Annual Cargo Handled",
            "icon_name": "30.svg",
            "delay": ".4s"
        },
        {
            "count": 1334,
            "title": "Annual Air Tonnage **(Freight)**",
            "icon_name": "31.svg",
            "delay": ".4s"
        },
        {
            "count": 4069,
            "title": "Annual LCL CBM **(Freight)**",
            "icon_name": "32.svg",
            "delay": ".4s"
        },
        {
            "count": 5246,
            "suffix": "+",
            "title": "Annual TEUs **(Freight)**",
            "icon_name": "33.svg",
            "delay": ".4s"
        },
        {
            "count": 38651,
            "suffix": "+",
            "title": "Annual Customs Brokerage **(Air)**",
            "icon_name": "28.svg",
            "delay": ".4s"
        },
        {
            "count": 1722,
            "suffix": "+",
            "title": "Annual Customs Brokerage **(LCL)**",
            "icon_name": "27.svg",
            "delay": ".4s"
        },
        {
            "count": 6033,
            "suffix": "+",
            "title": "Annual Customs Brokerage **(TEUs)**",
            "icon_name": "15.svg",
            "delay": ".4s"
        }
    ]

    home = HomePageContent.objects.first()
    if not home:
        print("Error: No HomePageContent found. Please seed the database first.")
        return

    # Delete existing homepage achievements
    print("Deleting current homepage achievements...")
    Achievement.objects.filter(home=home).delete()

    print("Copying icons and seeding achievements...")
    for ach in old_achievements:
        icon_name = ach["icon_name"]
        src_file = frontend_icon_dir / icon_name
        dest_file = media_achievement_dir / icon_name
        
        if src_file.exists():
            shutil.copy2(src_file, dest_file)
        else:
            print(f"Warning: SVG {src_file} not found!")
            
        db_icon_path = f"achievements/{icon_name}"
        
        Achievement.objects.create(
            home=home,
            title=ach["title"],
            count=ach["count"],
            icon=db_icon_path,
            delay=ach["delay"],
            suffix=ach.get("suffix", ""),
            prefix=ach.get("prefix", ""),
            is_active=True
        )
        print(f" -> Achievement '{ach['title']}' seeded.")

    print("All old achievements seeded successfully!")

if __name__ == '__main__':
    seed()
