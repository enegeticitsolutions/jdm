import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import FAQ, AboutPageContent

faq_data = [
    {
        "title": "Why should you prefer JDM Group?",
        "description": "We are far better than other CHAs because we have all three kinds of services collectively that others don't have (Own Brokerage License, Own Transportation, Own Warehouse). Our warehouse & office in Delhi are close to the airport, enabling superior service especially during COVID-19. We saved customers crores in demurrages by clearing cargo during lockdown and storing it in our warehouse until their facilities reopened."
    },
    {
        "title": "What types of freight services do you offer?",
        "description": "We offer comprehensive freight solutions including Air Freight, Ocean Freight, Rail Transport, Road Transport, and Multimodal services tailored to your business needs."
    },
    {
        "title": "Do you provide international freight forwarding?",
        "description": "Yes, we specialize in international freight forwarding with end-to-end services including pickup, documentation, customs clearance, and final delivery."
    },
    {
        "title": "What industries do you serve?",
        "description": "We cater to a wide range of industries including Automotive, Electronics, Agriculture, Pharmaceuticals, Textile, Steel & Iron, Perishables, and more."
    },
    {
        "title": "How do I get a freight quote?",
        "description": "You can request a free quote through our website or contact our customer service team with your shipment details."
    },
    {
        "title": "What customs brokerage services do you offer?",
        "description": "We handle import/export clearance, HS code classification, duty & tax calculations, license handling, and regulatory compliance."
    },
    {
        "title": "How long does the customs clearance process take?",
        "description": "Customs clearance timelines depend on shipment type and origin/destination. Typically, clearance is completed within 1–3 business days."
    },
    {
        "title": "Can you help with restricted or regulated goods?",
        "description": "Yes, we assist with documentation, licenses, and clearances for restricted or regulated commodities."
    },
    {
        "title": "What documents are required for customs clearance?",
        "description": "Essential documents include the commercial invoice, packing list, bill of lading/airway bill, and any relevant certificates or licenses."
    },
    {
        "title": "Do you offer support for post-clearance audits or disputes?",
        "description": "Yes, our team can represent you in audits and assist with customs dispute resolution."
    },
    {
        "title": "What areas do you cover for road transportation?",
        "description": "We offer pan-India and cross-border road transportation with express and standard delivery options."
    },
    {
        "title": "Do you offer temperature-controlled or special handling transport?",
        "description": "Yes, we provide refrigerated transport, high-value cargo handling, and specialized equipment for delicate or oversized shipments."
    },
    {
        "title": "Is your fleet GPS-enabled?",
        "description": "Yes, all our transport vehicles are equipped with GPS for real-time tracking and route optimization."
    },
    {
        "title": "Do you handle perishable or time-sensitive shipments?",
        "description": "Yes, we specialize in the timely delivery of perishables including fruits, vegetables, flowers, and pharmaceuticals."
    }
]

def seed():
    about = AboutPageContent.objects.first()
    if not about:
        print("ERROR: AboutPageContent not found. Please run seed_full.py or seed_db.py first.")
        return

    print("Deleting old FAQs...")
    FAQ.objects.all().delete()
    for faq in faq_data:
        print(f"Creating FAQ: {faq['title']}")
        FAQ.objects.create(
            about=about,
            title=faq["title"],
            description=faq["description"],
            is_active=True
        )
    print("FAQs seeded successfully!")

if __name__ == '__main__':
    seed()
