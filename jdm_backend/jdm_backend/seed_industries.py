import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import Industry

def seed_industries():
    # Clear existing industries
    Industry.objects.all().delete()
    print("Deleted old industries.")

    industries_data = [
        {
            "title": "Pharmaceuticals & Healthcare",
            "type": "bullet",  # Render list items and description
            "content": "Ensuring timely delivery of medical consignments is critical for hospitals and healthcare providers. We understand that customers require reliable and trustworthy freight solution providers to help them move swiftly during emergencies and to keep the integrity of their supplies maintained.\n\nHermes is equipped at managing both active and passive pharmaceutical shipments (-20C, 2-8C, 15C-25C) facilitating trade lane risk assessments alongside designing customer specific SOPs to move shipments at the right temperature.\n\nOur experience in healthcare encompasses:",
            "list_items": [
                "APIs",
                "Formulations",
                "Vaccines",
                "Launch pharmaceutical shipments",
                "Medical Devices",
                "Narcotics",
                "Aid and relief material"
            ],
            "image": "industry_images/pharmaceuticals_healthcare_v2.jpg",
            "is_image_left": True,
        },
        {
            "title": "Chemicals",
            "type": "para",
            "content": "Chemical logistics consists of hazardous and non hazardous cargo. A lot of the movement of chemical consignments take place through ocean freight transport and some are also carried forward by air freight for faster transit.\n\nEnsuring safety and adhering to all environmental regulations are the major challenges faced in chemical transportation. Hermes Travel and Cargo provides you with all of that and much more.",
            "list_items": [],
            "image": "industry_images/chemicals_v2.jpg",
            "is_image_left": False,
        },
        {
            "title": "Engineering",
            "type": "para",
            "content": "Engineering goods involve the movement of large scale shipments like solar panels, pipes, water filters, machinery, entire automobiles, spare parts for automobiles, and much more.\n\nHermes provides a comprehensive range of services to both small scale local businesses and multi national engineering companies. We have a robust infrastructure supported by multi modal modes of transport and a global and local presence across countries that ensures timely and reliable delivery.",
            "list_items": [],
            "image": "industry_images/engineering_v2.jpg",
            "is_image_left": True,
        },
        {
            "title": "Automotive",
            "type": "para",
            "content": "The automotive supply chain refers to the transportation of export and import of engines, machinery, equipment, spare parts of automobiles, components, subassemblies, and other large scale deliverables.\n\nAt Hermes, we provide bespoke integrated services to ensure end to end delivery of your cargo in the most efficient way possible. Our business partners and vendors are experienced and thorough with their line of work to deliver uncompromised solutions.",
            "list_items": [],
            "image": "industry_images/automotive_v2.jpg",
            "is_image_left": False,
        },
        {
            "title": "Apparels and Retail",
            "type": "para",
            "content": "The retail and apparel industry is subject to rapid changes. Therefore, managing the retail and fashion industry demands a logistics provider that is flexible and experienced to handle scales at that level.\n\nHermes provides integrated services to provide productive and efficient supply chain solutions that are tailored to meet your expectations and requirements. Our services help you maintain sustainability in your business practise.",
            "list_items": [],
            "image": "industry_images/apparels_retail_v2.jpg",
            "is_image_left": True,
        },
        {
            "title": "Perishables",
            "type": "bullet",
            "content": "Maintaining shipment integrity is of prime importance in the shipment of perishables. These include the transportation of sensitive products like seafood, flower, fruits, vegetables and other food products. Hermes is the preferred partner for leading perishable exporters in India.\n\nOur services utilize some of the best in class practices for secured and timely delivery. Some of them include:",
            "list_items": [
                "Commercial contracts with capacity allocations",
                "Scalability of allocations to manage seasonal peaks Mangoes",
                "Prioritized space on carriers with prioritized handling at ports",
                "Dedicated perishable handling team",
                "Temperature controlled perishables 2C - 8C, Pomegranate arils",
                "15C - 25C transit warehouse",
                "24/7 custom clearance",
                "Documentation expertise and custom compliances"
            ],
            "image": "industry_images/perishables_v2.jpg",
            "is_image_left": False,
        },
        {
            "title": "Technology",
            "type": "para",
            "content": "Technology is one of the most disruptive domains to work with, since product life cycles are likely to get over in months before the next innovation makes it to the market.\n\nWe understand that such a dynamic market requires dynamic solutions. At Hermes, you will find top of the line support to assist you at every stage of your journey. Our uncompromised customer centric solution and legacy of 50 years continue to serve the leading business with a futuristic vision.",
            "list_items": [],
            "image": "industry_images/technology_v2.jpg",
            "is_image_left": True,
        },
    ]

    for item in industries_data:
        Industry.objects.create(**item)
        print(f"Created industry: {item['title']}")

if __name__ == '__main__':
    seed_industries()
