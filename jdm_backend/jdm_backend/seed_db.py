import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import HomePageContent, AboutPageContent, IndustrySpecification, ContactInfo, MobileOffcanvas

def seed():
    # Home
    if not HomePageContent.objects.exists():
        HomePageContent.objects.create()
        print("Created default HomePageContent.")
    
    # About
    if not AboutPageContent.objects.exists():
        AboutPageContent.objects.create(
            heading="About Us",
            story_heading="Our Story",
            story_paragraph="This is our story.",
            para1="Paragraph 1",
            para2="Paragraph 2",
            mission_heading="Our Mission",
            mission_paragraph="Mission statement.",
            vision_heading="Our Vision",
            vision_paragraph="Vision statement.",
            values_heading="Our Values",
            faq_heading="FAQs",
            faq_paragraph="Frequently asked questions."
        )
        print("Created default AboutPageContent.")
    
    # Industry Specs
    if not IndustrySpecification.objects.exists():
        IndustrySpecification.objects.create()
        print("Created default IndustrySpecification.")

    # Contact Info
    if not ContactInfo.objects.exists():
        ContactInfo.objects.create(
            title="Contact Us",
            address_title="Our Office",
            address="123 Street",
            contact_title="Get in Touch",
            phone_label="Phone",
            phone="1234567890",
            phone_href="tel:1234567890",
            email_label="Email",
            email="test@example.com",
            email_href="mailto:test@example.com",
            iframe="<iframe src=''></iframe>"
        )
        print("Created default ContactInfo.")

    # Mobile Offcanvas
    if not MobileOffcanvas.objects.exists():
        MobileOffcanvas.objects.create(
            title="Contact Info",
            address="A-75, Road No. 4, Street No. 6, Mahipalpur Extn., New Delhi 110037",
            address_url="#",
            email="info@jdmgroups.com",
            working_hours="Mon-Sat, 9:30 Am - 6:30 Pm",
            phone="+91-49707070-100",
            phone_href="tel:+9149707070",
            button_text="Get A Quote",
            button_url="/contact",
            description="Our mission is to provide operational excellence, competitive cost control and visibility to our customers who are globally sourcing and distributing in an integrated supply chain environment.",
        )
        print("Created default MobileOffcanvas.")

if __name__ == '__main__':
    seed()
