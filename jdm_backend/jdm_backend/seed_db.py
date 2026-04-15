import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import HomePageContent, AboutPageContent, IndustrySpecification, ContactInfo

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

if __name__ == '__main__':
    seed()
