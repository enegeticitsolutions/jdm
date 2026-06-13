import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import (
    HomePageContent, HomeServiceOrder, Service, ServiceBenefit,
    GalleryEvent, GalleryPhoto, TeamMember, Location,
    ClienteleItem, AssociationItem, AffiliationItem, SeaPartnerItem, AirPartnerItem,
    Achievement, AboutPageContent, FAQ, IndustrySpecification, Industry,
    ContactInfo, ValueAddedService, News, JDMGroupCompany
)
from datetime import date

def seed_services():
    """Create all services matching the production site."""
    if Service.objects.exists():
        print("Services already exist, skipping.")
        return

    services_data = [
        {
            "title": "Air Freight",
            "image": "services/Air Freight.webp",
            "icon": "fa-solid fa-plane",
            "description": "JDM Group offers comprehensive air freight solutions tailored to meet your logistics needs with speed and reliability.",
            "description1": "Our air freight services connect you to major destinations worldwide through partnerships with leading airlines. We handle everything from documentation to customs clearance.",
            "heading": "Why Choose Our Air Freight Services?",
            "description2": "With decades of experience, we ensure your cargo reaches its destination safely and on time. Our network spans across continents, providing you with unmatched coverage.",
            "position": 1,
            "benefits": ["Door-to-door delivery", "Real-time tracking", "Customs clearance", "Competitive rates", "Express and economy options"]
        },
        {
            "title": "Ocean Freight",
            "image": "services/Inside Ship.webp",
            "icon": "fa-solid fa-ship",
            "description": "Reliable ocean freight solutions for FCL and LCL shipments across all major trade lanes worldwide.",
            "description1": "Our ocean freight services provide cost-effective shipping solutions for businesses of all sizes. We offer both Full Container Load (FCL) and Less than Container Load (LCL) options.",
            "heading": "Comprehensive Ocean Freight Solutions",
            "description2": "With strategic partnerships with major shipping lines, we ensure competitive rates and reliable transit times for your cargo.",
            "position": 2,
            "benefits": ["FCL and LCL options", "Global coverage", "Competitive rates", "Cargo insurance", "Real-time tracking"]
        },
        {
            "title": "Customs Brokerage",
            "image": "services/Customs Brokrage.webp",
            "icon": "fa-solid fa-file-shield",
            "description": "Expert customs brokerage services ensuring smooth and compliant clearance of your shipments.",
            "description1": "Our licensed customs brokers handle all aspects of customs clearance, ensuring your goods move through borders without delays.",
            "heading": "Hassle-Free Customs Clearance",
            "description2": "We stay updated with the latest regulations and tariff changes to ensure full compliance and minimize duties.",
            "position": 3,
            "benefits": ["Licensed customs brokers", "Duty optimization", "Regulatory compliance", "Documentation handling", "Tariff classification"]
        },
        {
            "title": "Project Cargo",
            "image": "services/Project Cargo.webp",
            "icon": "fa-solid fa-boxes-stacked",
            "description": "Specialized project cargo and heavy-lift transportation for oversized and complex shipments.",
            "description1": "We specialize in moving heavy, oversized, and high-value project cargo with precision planning and execution.",
            "heading": "End-to-End Project Cargo Solutions",
            "description2": "From route surveys to specialized equipment, we provide comprehensive project logistics solutions tailored to your needs.",
            "position": 4,
            "benefits": ["Heavy-lift capability", "Route planning", "Specialized equipment", "Engineering support", "Risk assessment"]
        },
        {
            "title": "Perishable Cargo",
            "image": "services/Perishable Cargo.webp",
            "icon": "fa-solid fa-temperature-low",
            "description": "Temperature-controlled logistics for perishable goods including pharmaceuticals, food, and flowers.",
            "description1": "Our cold chain solutions ensure your perishable cargo maintains the required temperature throughout the supply chain.",
            "heading": "Cold Chain Excellence",
            "description2": "With state-of-the-art temperature monitoring and dedicated reefer containers, we protect your sensitive cargo.",
            "position": 5,
            "benefits": ["Temperature monitoring", "Reefer containers", "GDP compliance", "Quick transit times", "Quality assurance"]
        },
        {
            "title": "Courier Service",
            "image": "services/Courier.webp",
            "icon": "fa-solid fa-truck-fast",
            "description": "Fast and reliable international courier services for documents and parcels worldwide.",
            "description1": "Our courier services provide swift delivery of documents and parcels to destinations across the globe.",
            "heading": "Swift Courier Solutions",
            "description2": "With partnerships with major express carriers, we offer competitive rates and guaranteed delivery timelines.",
            "position": 6,
            "benefits": ["Express delivery", "Door-to-door service", "Online tracking", "Document handling", "Worldwide coverage"]
        },
        {
            "title": "Warehousing",
            "image": "services/Warehouse.webp",
            "icon": "fa-solid fa-warehouse",
            "description": "Modern warehousing and distribution solutions with advanced inventory management systems.",
            "description1": "Our strategically located warehouses provide secure storage and efficient distribution services for your goods.",
            "heading": "Smart Warehousing Solutions",
            "description2": "With advanced WMS and trained staff, we ensure your inventory is managed efficiently and accurately.",
            "position": 7,
            "benefits": ["Bonded warehousing", "Inventory management", "Pick and pack services", "Distribution", "24/7 security"]
        },
        {
            "title": "Exhibition Cargo",
            "image": "services/exhibition.webp",
            "icon": "fa-solid fa-calendar-days",
            "description": "Complete exhibition and event logistics including booth setup, shipping, and on-site handling.",
            "description1": "We provide end-to-end exhibition logistics support, ensuring your display materials and equipment arrive on time and in perfect condition.",
            "heading": "Exhibition Logistics Expertise",
            "description2": "From packing to installation and return logistics, we handle every aspect of your exhibition cargo needs.",
            "position": 8,
            "benefits": ["On-site handling", "Booth setup support", "Temporary import/export", "Return logistics", "Insurance coverage"]
        },
        {
            "title": "Road Transportation",
            "image": "services/Transport.webp",
            "icon": "fa-solid fa-truck",
            "description": "Comprehensive inland transportation services covering the length and breadth of India.",
            "description1": "Our fleet of vehicles and network of transport partners ensure reliable and timely delivery across India.",
            "heading": "Reliable Transportation Network",
            "description2": "From first mile to last mile, we provide seamless transportation solutions with real-time visibility.",
            "position": 9,
            "benefits": ["Pan-India coverage", "GPS tracking", "Dedicated fleet", "Express and standard options", "Multi-modal transport"]
        },
        {
            "title": "Rail Freight",
            "image": "services/Train Freight.webp",
            "icon": "fa-solid fa-train",
            "description": "Cost-effective rail freight solutions for bulk cargo movement across India.",
            "description1": "Rail freight offers an economical and eco-friendly alternative for moving large volumes of cargo across long distances.",
            "heading": "Efficient Rail Freight Services",
            "description2": "We work with Indian Railways and private operators to provide competitive rail logistics solutions.",
            "position": 10,
            "benefits": ["Cost-effective", "Eco-friendly", "Bulk cargo handling", "Container trains", "Multi-modal integration"]
        },
        {
            "title": "Packing & Moving",
            "image": "services/Packer.webp",
            "icon": "fa-solid fa-box-open",
            "description": "Professional packing and moving services for household and commercial relocations.",
            "description1": "Our trained packers use high-quality materials to ensure your belongings are safely packed and transported.",
            "heading": "Safe and Secure Relocations",
            "description2": "Whether it's a household move or office relocation, we handle everything with care and professionalism.",
            "position": 11,
            "benefits": ["Professional packing", "Secure transport", "Unpacking services", "Insurance coverage", "International relocations"]
        },
    ]

    for svc_data in services_data:
        benefits = svc_data.pop("benefits")
        svc = Service.objects.create(**svc_data)
        for b in benefits:
            ServiceBenefit.objects.create(service=svc, text=b)
        print(f"  Created service: {svc.title}")

    print(f"Created {len(services_data)} services.")


def seed_home_content():
    """Update existing HomePageContent with media files and link services."""
    home = HomePageContent.objects.first()
    if not home:
        home = HomePageContent.objects.create()
        print("Created HomePageContent.")

    home.hero_video = "videos/hero/intro.mp4"
    home.hero_image = "hero/Banner.jpg"
    home.journey_video = "videos/journey/JDM_Timeline.mp4"
    home.services_heading = "Our Services"
    home.journey_heading = "Our Journey"
    home.clientele_heading = "Our Clientele"
    home.associations_heading = "Associations"
    home.affiliations_heading = "Accreditations & Certifications"
    home.sea_partners_heading = "Sea Carrier Partners"
    home.air_partners_heading = "Air Carrier Partners"
    home.achievements_heading = "Achievements"
    home.locations_heading = "Our Locations"
    home.save()

    # Link services to homepage (first 8)
    if not HomeServiceOrder.objects.exists():
        services = Service.objects.all()[:8]
        for i, svc in enumerate(services):
            HomeServiceOrder.objects.create(home=home, service=svc, position=i)
        print(f"  Linked {len(services)} services to homepage.")

    # Clientele logos
    if not ClienteleItem.objects.exists():
        for i in range(1, 41):
            ClienteleItem.objects.create(home=home, logo=f"clients/{i}.png")
        print("  Created 40 clientele items.")

    # Affiliation logos
    if not AffiliationItem.objects.exists():
        affiliation_files = ["AEO.png", "DUNS.png", "FFFAI.png", "IATA.png", "ISO.png", "MTO.png", "WCA.png"]
        for f in affiliation_files:
            AffiliationItem.objects.create(home=home, logo=f"affiliations/{f}")
        print(f"  Created {len(affiliation_files)} affiliation items.")

    # Association logos
    # 1. ADD THIS LINE to delete the old ghost files:
    #AssociationItem.objects.all().delete() 

    # 2. COMMENT OUT this line so it doesn't block the script:
if not AssociationItem.objects.exists():
    
    import glob
    assoc_dir = os.path.join(os.path.dirname(__file__), 'media', 'associations')
    
    # Make sure this checks for both types just in case!
    assoc_files = [f for f in os.listdir(assoc_dir) if f.endswith(('.png', '.jpg', '.webp'))]
    
    for f in assoc_files:
        AssociationItem.objects.create(home=home, logo=f"associations/{f}")
    print(f"  Created {len(assoc_files)} association items.")

    # Sea partners
    #SeaPartnerItem.objects.all().delete()  # 👈 ADD THIS: Deletes old records
if not SeaPartnerItem.objects.exists():  # 👈 COMMENT THIS OUT
    sea_dir = os.path.join(os.path.dirname(__file__), 'media', 'carriers', 'sea')
    sea_files = [f for f in os.listdir(sea_dir) if f.endswith(('.jpg', '.png', '.webp'))]
    for f in sea_files:
        SeaPartnerItem.objects.create(home=home, logo=f"carriers/sea/{f}")
    print(f"  Created {len(sea_files)} sea partner items.")

    # Air partners
    #AirPartnerItem.objects.all().delete()  # 👈 ADD THIS: Deletes old records
if not AirPartnerItem.objects.exists():  # 👈 COMMENT THIS OUT
    air_dir = os.path.join(os.path.dirname(__file__), 'media', 'carriers', 'air')
    air_files = [f for f in os.listdir(air_dir) if f.endswith(('.jpg', '.png', '.webp'))]
    for f in air_files:
        AirPartnerItem.objects.create(home=home, logo=f"carriers/air/{f}")
    print(f"  Created {len(air_files)} air partner items.")

    # Locations
    if not Location.objects.exists():
        locations_data = [
            {"city": "New Delhi", "address": "4, Mahipalpur Extn., New Delhi - 110037", "phone": ["+91-11-49536400"], "email": "info@jdmgroups.com", "image": "locations/India Gate Delhi.jpg", "place": "New Delhi"},
            {"city": "Mumbai", "address": "Mumbai Office, Maharashtra", "phone": ["+91-22-26831234"], "email": "mumbai@jdmgroups.com", "image": "locations/Mumbai-India-Taj-Mahal-Palace.jpg", "place": "Mumbai"},
            {"city": "Chennai", "address": "Chennai Office, Tamil Nadu", "phone": ["+91-44-22345678"], "email": "chennai@jdmgroups.com", "image": "locations/Kapaleeswarar Temple, Chennai.jpg", "place": "Chennai"},
            {"city": "Ahmedabad", "address": "Ahmedabad Office, Gujarat", "phone": ["+91-79-22345678"], "email": "ahmedabad@jdmgroups.com", "image": "locations/Narendra_Modi_Stadium Ahmedabad.jpg", "place": "Ahmedabad"},
            {"city": "Bengaluru", "address": "Bengaluru Office, Karnataka", "phone": ["+91-80-22345678"], "email": "bengaluru@jdmgroups.com", "image": "locations/Vidhana Soudha Bengaluru.jpg", "place": "Bengaluru"},
            {"city": "Pune", "address": "Pune Office, Maharashtra", "phone": ["+91-20-22345678"], "email": "pune@jdmgroups.com", "image": "locations/Shrimant Dagdusheth Halwai Ganpati Mandir-Pune.png", "place": "Pune"},
            {"city": "Mundra", "address": "Mundra Office, Gujarat", "phone": ["+91-2838-123456"], "email": "mundra@jdmgroups.com", "image": "locations/Unity Statue Mundra.jpg", "place": "Mundra"},
            {"city": "Pipavav", "address": "Pipavav Office, Gujarat", "phone": ["+91-2794-123456"], "email": "pipavav@jdmgroups.com", "image": "locations/Somanath_Temple Pipava.jpg", "place": "Pipavav"},
            {"city": "Dadri", "address": "Dadri Office, UP", "phone": ["+91-120-1234567"], "email": "dadri@jdmgroups.com", "image": "locations/Ayodhya_Ram_Mandir Dadri.jpg", "place": "Dadri"},
            {"city": "Khatuwas", "address": "Khatuwas Office, Rajasthan", "phone": ["+91-1234-567890"], "email": "khatuwas@jdmgroups.com", "image": "locations/Neemrana fort Khatuwas.png", "place": "Khatuwas"},
            {"city": "Chhatrapati Shivaji Terminal", "address": "CST, Mumbai", "phone": ["+91-22-22345679"], "email": "cst@jdmgroups.com", "image": "locations/Mumabi Chhatrapati Shivaji Terminal.jpg", "place": "Mumbai CST"},
        ]
        for loc in locations_data:
            Location.objects.create(home=home, **loc)
        print(f"  Created {len(locations_data)} locations.")

    # Achievements
    if not Achievement.objects.filter(home=home).exists():
        achievements_data = [
            {"title": "Years of Experience", "count": 30, "icon": "achievements/30.svg", "delay": ".2s", "suffix": "+", "prefix": ""},
            {"title": "Happy Clients", "count": 500, "icon": "achievements/plus.svg", "delay": ".4s", "suffix": "+", "prefix": ""},
            {"title": "Offices Worldwide", "count": 15, "icon": "achievements/minus.svg", "delay": ".6s", "suffix": "+", "prefix": ""},
        ]
        for ach in achievements_data:
            Achievement.objects.create(home=home, **ach)
        print(f"  Created {len(achievements_data)} achievements.")

    print("Home page content updated.")


def seed_gallery():
    """Create gallery events with photos."""
    if GalleryEvent.objects.exists():
        print("Gallery already exists, skipping.")
        return

    event = GalleryEvent.objects.create(title="Company Events", is_active=True)
    gallery_files = ["1.png", "2.JPG", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "8.JPG", "9.jpg"]
    for gf in gallery_files:
        GalleryPhoto.objects.create(event=event, image=f"gallery/{gf}", alt=f"Gallery Photo {gf.split('.')[0]}", caption="", is_active=True)

    event2 = GalleryEvent.objects.create(title="GFI Golf Tour 2023", is_active=True)
    GalleryPhoto.objects.create(event=event2, image="gallery/GFI Golf Tour 2023.png", alt="GFI Golf Tour 2023", caption="GFI Golf Tour 2023", is_active=True)

    print(f"Created 2 gallery events with {len(gallery_files) + 1} photos.")


def seed_team():
    """Create team members."""
    if TeamMember.objects.exists():
        print("Team members already exist, skipping.")
        return

    team_data = [
        {"name": "Lt. Sh. Pahlad Singh Ji", "role": "Founder", "excerpt": "Founder and Visionary of JDM Group", "image": "team/Lt._Sh._Pahlad_Singh_Ji.png", "bio": "The visionary founder who established JDM Group and laid the foundation for a legacy of excellence in logistics."},
        {"name": "Ajay", "role": "Director", "excerpt": "Leading operations and strategic growth", "image": "team/Ajay Sir.jpg", "bio": "A seasoned professional driving the company's strategic growth and operational excellence."},
        {"name": "Anju", "role": "Director", "excerpt": "Overseeing business development", "image": "team/Anju Ma'am.jpg", "bio": "A dynamic leader overseeing business development and client relationships."},
        {"name": "Anuj", "role": "Director", "excerpt": "Managing finance and accounts", "image": "team/Anuj Ji.jpg", "bio": "Expert in financial management and strategic planning for the organization."},
        {"name": "Mukesh", "role": "Senior Manager", "excerpt": "Operations excellence", "image": "team/Mukesh Sir.jpg", "bio": "Dedicated professional ensuring smooth operations across all verticals."},
        {"name": "Ashish Sehrawat", "role": "Manager", "excerpt": "Logistics and supply chain", "image": "team/Ashish Sehrawat.jpg", "bio": "Specialist in logistics and supply chain management."},
        {"name": "Bikram", "role": "Manager", "excerpt": "Client relations", "image": "team/Bikram.jpg", "bio": "Builds and maintains strong client relationships."},
        {"name": "Jaspreet", "role": "Manager", "excerpt": "Air freight operations", "image": "team/Jaspreet Ji.jpg", "bio": "Expert in air freight operations and carrier management."},
        {"name": "Jatin", "role": "Manager", "excerpt": "Ocean freight operations", "image": "team/Jatin.jpg", "bio": "Specialist in ocean freight logistics and documentation."},
        {"name": "Kusum", "role": "Manager", "excerpt": "HR and administration", "image": "team/Kusum.jpg", "bio": "Managing human resources and administrative functions."},
        {"name": "Manoj", "role": "Manager", "excerpt": "Customs operations", "image": "team/Manoj Ji.jpg", "bio": "Expert in customs clearance and regulatory compliance."},
        {"name": "Randhir", "role": "Manager", "excerpt": "Warehouse operations", "image": "team/Randhir Ji.jpg", "bio": "Managing warehouse operations and inventory control."},
        {"name": "Sahil", "role": "Manager", "excerpt": "IT and digital transformation", "image": "team/SahilSir.jpg", "bio": "Driving IT initiatives and digital transformation for the company."},
    ]

    for tm in team_data:
        TeamMember.objects.create(**tm, is_active=True)

    print(f"Created {len(team_data)} team members.")


def seed_about():
    """Update about page with real data."""
    about = AboutPageContent.objects.first()
    if not about:
        return

    about.heading = "About JDM Group"
    about.story_heading = "Our Story"
    about.story_paragraph = "JDM Group is a leading logistics and supply chain solutions provider, established with a vision to deliver customer delight through innovative and reliable services."
    about.story_points = [
        "Founded with a vision for excellence in logistics",
        "Over 30 years of industry experience",
        "Pan-India presence with global reach",
        "Committed to customer satisfaction"
    ]
    about.founder_image = "founder/Lt._Sh._Pahlad_Singh_Ji.png"
    about.para1 = "JDM Group has been at the forefront of the logistics industry, providing end-to-end supply chain solutions to businesses across the globe. Our commitment to excellence and customer-centric approach has made us one of the most trusted names in the industry."
    about.para2 = "With a team of experienced professionals and a robust infrastructure, we ensure that every shipment is handled with utmost care and delivered on time, every time."
    about.mission_heading = "Our Mission"
    about.mission_paragraph = "To provide world-class logistics solutions that exceed customer expectations through innovation, reliability, and integrity."
    about.mission_image = "about/mission/Our Mission.jpg"
    about.vision_heading = "Our Vision"
    about.vision_paragraph = "To be the most trusted and preferred logistics partner globally, known for excellence in service delivery and customer satisfaction."
    about.vision_image = "about/vision/Our Vision.jpg"
    about.values_heading = "Our Values"
    about.values_image = "about/values/Our Values.jpg"
    about.values_points = [
        "Customer First - We prioritize our customers in everything we do",
        "Integrity - We conduct business with honesty and transparency",
        "Innovation - We continuously improve our services and processes",
        "Excellence - We strive for the highest standards in all operations",
        "Teamwork - We believe in the power of collaboration"
    ]
    about.key_strengths_heading = "Our Key Strengths"
    about.key_strengths_points = [
        "30+ years of industry experience",
        "Pan-India presence with 11+ offices",
        "Global network spanning 150+ countries",
        "500+ satisfied clients",
        "Advanced technology-driven solutions",
        "Dedicated and experienced team"
    ]
    about.key_strengths_image = "about/keystrength/key_strenghts.png"
    about.faq_heading = "Frequently Asked Questions"
    about.faq_paragraph = "Find answers to commonly asked questions about our logistics services."
    about.save()

    # FAQs
    if not FAQ.objects.exists():
        faqs = [
            {"title": "What services does JDM Group offer?", "description": "JDM Group offers comprehensive logistics solutions including Air Freight, Ocean Freight, Customs Brokerage, Project Cargo, Perishable Cargo, Courier Services, Warehousing, Exhibition Cargo, Transportation, and Rail Freight."},
            {"title": "How can I track my shipment?", "description": "You can track your shipment through our online tracking portal or by contacting our customer service team with your tracking number."},
            {"title": "Do you handle international shipments?", "description": "Yes, we handle both domestic and international shipments across air, sea, and land routes, connecting to 150+ countries worldwide."},
            {"title": "What is the minimum shipment size you handle?", "description": "We handle shipments of all sizes, from small parcels to oversized project cargo. Our LCL services are perfect for smaller shipments."},
            {"title": "How do I get a quote for my shipment?", "description": "You can request a quote by contacting us through our website, email, or phone. Our team will provide a competitive quote based on your requirements."},
        ]
        for faq in faqs:
            FAQ.objects.create(about=about, **faq, is_active=True)
        print(f"  Created {len(faqs)} FAQs.")

    # About page achievements
    if not Achievement.objects.filter(about=about).exists():
        achievements = [
            {"title": "Years of Experience", "count": 30, "icon": "achievements/30.svg", "delay": ".2s", "suffix": "+"},
            {"title": "Happy Clients", "count": 500, "icon": "achievements/plus.svg", "delay": ".4s", "suffix": "+"},
            {"title": "Team Members", "count": 200, "icon": "achievements/minus.svg", "delay": ".6s", "suffix": "+"},
        ]
        for ach in achievements:
            Achievement.objects.create(about=about, **ach)
        print(f"  Created {len(achievements)} about achievements.")

    print("About page content updated.")


def seed_industry():
    """Create industry data."""
    if Industry.objects.exists():
        print("Industry already exists, skipping.")
        return

    industries = [
        {
            "title": "Automotive Industry",
            "type": "para",
            "content": "JDM Group provides specialized logistics solutions for the automotive industry, handling everything from spare parts to fully assembled vehicles with precision and care.",
            "image": "industry_images/mission.png",
            "is_image_left": True,
        },
        {
            "title": "Pharmaceutical Industry",
            "type": "bullet",
            "list_items": [
                "Temperature-controlled transportation",
                "GDP compliant logistics",
                "Cold chain management",
                "Regulatory documentation support",
                "Last-mile delivery solutions"
            ],
            "image": "industry_images/contact-img-shape.png",
            "is_image_left": False,
        },
    ]

    for ind in industries:
        Industry.objects.create(**ind)

    print(f"Created {len(industries)} industries.")


def seed_vas():
    """Create Value Added Services."""
    if ValueAddedService.objects.exists():
        print("VAS already exists, skipping.")
        return

    vas_data = [
        {
            "title": "Cargo Insurance",
            "para1": "Protect your shipments with comprehensive cargo insurance coverage. We offer competitive rates and hassle-free claims processing.",
            "para2": "Our insurance solutions cover all modes of transport and protect against damage, loss, and theft during transit."
        },
        {
            "title": "Supply Chain Consulting",
            "para1": "Our experts analyze your supply chain to identify optimization opportunities and cost savings.",
            "para2": "We provide end-to-end supply chain consulting services to help you streamline operations and improve efficiency."
        },
        {
            "title": "Trade Compliance",
            "para1": "Navigate complex international trade regulations with our compliance advisory services.",
            "para2": "We help you stay compliant with import/export regulations, sanctions, and trade agreements."
        },
    ]

    for vas in vas_data:
        ValueAddedService.objects.create(**vas)

    print(f"Created {len(vas_data)} Value Added Services.")


def seed_contact():
    """Update contact info."""
    contact = ContactInfo.objects.first()
    if contact:
        contact.title = "Contact Us"
        contact.address_title = "Our Head Office"
        contact.address = "4, Mahipalpur Extn., New Delhi - 110037, India"
        contact.contact_title = "Get in Touch"
        contact.phone_label = "Phone"
        contact.phone = "+91-11-49536400"
        contact.phone_href = "tel:+911149536400"
        contact.email_label = "Email"
        contact.email = "info@jdmgroups.com"
        contact.email_href = "mailto:info@jdmgroups.com"
        contact.iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8671!2d77.1176!3d28.5511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzA0LjAiTiA3N8KwMDcnMDMuNCJF!5e0!3m2!1sen!2sin!4v1234567890" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
        contact.save()
        print("Contact info updated.")


def seed_industry_spec():
    """Ensure IndustrySpecification exists and is active."""
    spec = IndustrySpecification.objects.first()
    if spec:
        spec.is_industry = True
        spec.save()
        print("Industry specification updated (is_industry=True).")


def seed_group_companies():
    """Create default JDM Group Companies."""
    if JDMGroupCompany.objects.exists():
        print("JDM Group Companies already exist, skipping.")
        return

    companies = [
        {"name": "JDM Worldwide Freight Solutions Pvt. Ltd.", "link": "", "position": 0},
        {"name": "JDM Cargo Planners Pvt. Ltd.", "link": "", "position": 1},
        {"name": "JDM Express Pvt. Ltd.", "link": "", "position": 2},
        {"name": "Arrow Transport Service", "link": "", "position": 3},
        {"name": "AS Transport Service", "link": "", "position": 4},
    ]

    for c in companies:
        JDMGroupCompany.objects.create(**c, is_active=True)
    print(f"Created {len(companies)} JDM Group Companies.")


if __name__ == '__main__':
    print("=== Starting full database seed ===\n")
    seed_services()
    seed_home_content()
    seed_gallery()
    seed_team()
    seed_about()
    seed_industry()
    seed_vas()
    seed_contact()
    seed_industry_spec()
    seed_group_companies()
    print("\n=== Full database seed complete ===")
