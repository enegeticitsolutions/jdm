import os
import django
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from clientele.models import Sector, SectorLogo

def seed_sector_logos():
    print("Deleting all existing SectorLogos...")
    SectorLogo.objects.all().delete()
    
    frontend_dir = r"c:\Users\Admin\Desktop\jdm\jdm_frontend\public\assets\img\customer_logo\Sector_Wise"
    
    # Iterate over sector directories
    for sector_name in os.listdir(frontend_dir):
        sector_dir = os.path.join(frontend_dir, sector_name)
        if not os.path.isdir(sector_dir):
            continue
            
        print(f"Processing sector: {sector_name}")
        # Find or create Sector
        sector, created = Sector.objects.get_or_create(name=sector_name)
        if created:
            print(f"  Created new sector: {sector_name}")
            
        # Process images
        for filename in os.listdir(sector_dir):
            if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                continue
                
            file_path = os.path.join(sector_dir, filename)
            
            try:
                with Image.open(file_path) as img:
                    # Convert to RGB (required for JPG)
                    if img.mode in ('RGBA', 'P', 'LA'):
                        # Create a white background for images with transparency
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        if img.mode == 'RGBA' or img.mode == 'LA':
                            background.paste(img, mask=img.split()[-1])
                        else:
                            background.paste(img)
                        img = background
                    elif img.mode != 'RGB':
                        img = img.convert('RGB')
                        
                    # Save to BytesIO in JPEG format
                    img_io = BytesIO()
                    img.save(img_io, format='JPEG', quality=95)
                    img_file = ContentFile(img_io.getvalue())
                    
                    new_filename = f"{sector_name}/{os.path.splitext(filename)[0]}.jpg"
                    
                    # Create SectorLogo
                    logo = SectorLogo(sector=sector, alt_text=f"{sector_name} Logo")
                    logo.image.save(new_filename, img_file, save=True)
                    print(f"  Added logo: {new_filename}")
            except Exception as e:
                print(f"  Failed to process {filename}: {e}")

if __name__ == '__main__':
    seed_sector_logos()
