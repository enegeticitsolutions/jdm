import os
import django
import shutil
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from django.conf import settings
from clientele.models import Sector, SectorLogo, Country, SubCountry, CountryLogo

def seed():
    frontend_logo_dir = Path(__file__).resolve().parent.parent.parent / 'jdm_frontend' / 'public' / 'assets' / 'img' / 'customer_logo'
    media_logo_dir = Path(settings.MEDIA_ROOT) / 'customer_logo'

    dest_sector_dir = media_logo_dir / 'sector_wise'
    dest_country_dir = media_logo_dir / 'country_wise'
    
    os.makedirs(dest_sector_dir, exist_ok=True)
    os.makedirs(dest_country_dir, exist_ok=True)

    sectors_mapping = {
        "Agriculture": "Agriculture",
        "Auto Industries": "Auto Industries",
        "Aviation": "Aviation",
        "Chemicals": "Chemicals",
        "Construction": "Construction",
        "Electronics": "Electronics",
        "Energy": "Energy",
        "Foods": "Foods",
        "Home Appliance": "Home Appliances",
        "Luxury": "luxury",
        "Mobile Spare Parts": "Mobile and Spare Parts",
        "Paper and Packaging": "Paper and Packaging",
        "Pharmaceutical": "Medical",
        "RMG and Fashion": "RMG and Fassion",
        "Safety and Security": "Safety and Security",
        "Steel and Iron": "Steel and Iron"
    }

    countries_structure = {
        "India": {
            "is_direct": True,
            "folder": "India",
            "subcountries": ["India"]
        },
        "Asia": {
            "is_direct": False,
            "folder": "Asia",
            "subcountries": {
                "China": "China",
                "Japan": "Japan",
                "Singapore": "Singapore",
                "South Korea": "South Korea",
                "Taiwan": "Taiwan"
            }
        },
        "Europe": {
            "is_direct": False,
            "folder": "Europe",
            "subcountries": {
                "Germany": "Germany",
                "Italy": "Italy",
                "United Kingdom": "UK",
                "Finland": "Finland",
                "France": "France",
                "Ireland": "Ireland",
                "Poland": "Poland",
                "Sweden": "Sweden",
                "Switzerland": "Switzerland"
            }
        },
        "North America": {
            "is_direct": False,
            "folder": "North America",
            "subcountries": {
                "United States": "United States"
            }
        }
    }

    # Delete existing data to prevent duplicates
    print("Deleting existing clientele data from database...")
    SectorLogo.objects.all().delete()
    Sector.objects.all().delete()
    CountryLogo.objects.all().delete()
    SubCountry.objects.all().delete()
    Country.objects.all().delete()

    print("Seeding sectors and copy images...")
    # Seed Sectors
    for sector_name, folder_name in sectors_mapping.items():
        src_dir = frontend_logo_dir / 'Sector_Wise' / folder_name
        if not src_dir.exists():
            print(f"Directory {src_dir} does not exist. Skipping.")
            continue
        
        # Create Sector
        sector_obj = Sector.objects.create(name=sector_name)
        
        # Create destination directory in media
        dest_folder = dest_sector_dir / folder_name
        os.makedirs(dest_folder, exist_ok=True)
        
        # Copy files and seed logo models
        count = 0
        for item in os.listdir(src_dir):
            if item.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                shutil.copy2(src_dir / item, dest_folder / item)
                
                # Image path relative to MEDIA_ROOT
                db_image_path = f"customer_logo/sector_wise/{folder_name}/{item}"
                SectorLogo.objects.create(
                    sector=sector_obj,
                    image=db_image_path,
                    alt_text=f"{sector_name} Logo {item.split('.')[0]}"
                )
                count += 1
        print(f" -> Sector: {sector_name} seeded with {count} logos.")

    print("Seeding countries and copy images...")
    # Seed Countries
    for country_name, info in countries_structure.items():
        country_obj = Country.objects.create(name=country_name)
        
        # Create dest country folder
        dest_country_folder = dest_country_dir / info["folder"]
        os.makedirs(dest_country_folder, exist_ok=True)
        
        if info.get("is_direct"):
            sub_name = info["subcountries"][0]
            sub_obj = SubCountry.objects.create(country=country_obj, name=sub_name)
            
            src_dir = frontend_logo_dir / 'Country_Wise' / info["folder"]
            count = 0
            for item in os.listdir(src_dir):
                if item.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    shutil.copy2(src_dir / item, dest_country_folder / item)
                    
                    db_image_path = f"customer_logo/country_wise/{info['folder']}/{item}"
                    CountryLogo.objects.create(
                        subcountry=sub_obj,
                        image=db_image_path,
                        alt_text=f"{sub_name} Logo {item.split('.')[0]}"
                    )
                    count += 1
            print(f" -> Country (direct): {country_name} seeded with {count} logos.")
        else:
            for sub_name, sub_folder in info["subcountries"].items():
                sub_obj = SubCountry.objects.create(country=country_obj, name=sub_name)
                
                src_dir = frontend_logo_dir / 'Country_Wise' / info["folder"] / sub_folder
                if not src_dir.exists():
                    print(f"Directory {src_dir} does not exist. Skipping.")
                    continue
                
                # Create dest subcountry folder
                dest_sub_folder = dest_country_folder / sub_folder
                os.makedirs(dest_sub_folder, exist_ok=True)
                
                count = 0
                for item in os.listdir(src_dir):
                    if item.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                        shutil.copy2(src_dir / item, dest_sub_folder / item)
                        
                        db_image_path = f"customer_logo/country_wise/{info['folder']}/{sub_folder}/{item}"
                        CountryLogo.objects.create(
                            subcountry=sub_obj,
                            image=db_image_path,
                            alt_text=f"{sub_name} Logo {item.split('.')[0]}"
                        )
                        count += 1
                print(f"   -> Subcountry: {sub_name} seeded with {count} logos.")

    print("Clientele database seeding completed successfully!")

if __name__ == '__main__':
    seed()
