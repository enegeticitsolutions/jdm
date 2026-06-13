import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import ValueAddedService

vas_data = [
    {
        "title": "Consultancy",
        "para1": "JDM’s decades of experience as a successful freight forwarder puts us in the unique position to advise and consult executives in businesses seeking to enter or expand their presence in global trade.",
        "para2": "The regulatory and logistical needs of each company are unique, and we take pride in delivering the kind of custom-tailored services that are difficult to find in larger corporations. Take the first step towards success in the world of international freight forwarding by contacting our consulting division today.\n\nWe are equipped with a knowledgeable team to provide Consultancy to our customers in SVB / EDD (submission, finalization), PSV, Offshore, HSS, Turnkey project movements, policies/notifications, etc., in a very professional and cost-effective manner."
    },
    {
        "title": "SVB",
        "para1": "Special Valuation Branch (SVB) is a Branch of the Custom House, specializing in investigating the transactions involving relationships between the supplier and the importer and certain other special features like Technical Collaboration between the parties, etc.",
        "para2": ""
    },
    {
        "title": "SEZ/STPI",
        "para1": "Special Economic Zones SEZ/STPI are growth engines that can boost manufacturing, augment experts and generate employment. The SEZs require a special fiscal and regulatory regime in order to ensure a hassle-free operation encompassing the state-of-the-art infrastructure and support services.",
        "para2": "JDM is the pioneer in setting up SEZ/STPI units in Economic Zones. Well-versed with the intricacies of the SEZ/STPI rules, we stand tall in providing single window solutions to all these units by handling government regulatory authorities such as SEZ/STPI excise and customs."
    },
    {
        "title": "DGFT",
        "para1": "We provide expert guidance and support on matters related to the Directorate General of Foreign Trade (DGFT), the regulatory authority responsible for overseeing India’s foreign trade policies and procedures.",
        "para2": "We assist businesses in navigating the complexities of DGFT regulations, including obtaining licenses, authorizations, and ensuring compliance with various trade policies."
    },
    {
        "title": "AA",
        "para1": "We leverage the Advance Authorization (AA) scheme to support our clients in optimizing their export operations. By facilitating duty-free import of raw materials needed for manufacturing export goods, we help reduce production costs and improve global competitiveness.",
        "para2": "Our expertise in navigating the complexities of the scheme ensures that our clients can access the necessary inputs without customs duties, streamlining their supply chain and enhancing profitability. With our deep understanding of input-output norms and export obligations, JDM Group ensures full compliance while maximizing efficiency. We are committed to providing cost-effective, reliable, and tailored solutions to drive success in international trade."
    },
    {
        "title": "EDD",
        "para1": "we specialize in managing the Refund of Extra Duty Deposit (EDD) process for our clients. We ensure that any excess duties paid during the clearance of goods are accurately identified and refunded, helping businesses avoid unnecessary financial burdens.",
        "para2": "Our experienced team navigates the complex customs procedures and ensures all documentation and compliance requirements are met, facilitating a smooth and efficient refund process. By handling the intricacies of EDD refunds, we enable our clients to recover overpaid duties quickly, improving their cash flow and operational efficiency. We are providing reliable, cost-effective solutions to enhance your business’s financial health."
    },
    {
        "title": "AEO",
        "para1": "We understand the significance of the Authorized Economic Operator (AEO) certification, a prestigious status granted to businesses involved in international trade. The AEO program enhances the security of the supply chain and simplifies customs procedures, providing businesses with numerous benefits such as faster clearance, reduced inspections, and greater reliability in global trade.",
        "para2": "We assist our clients in achieving AEO certification by guiding them through the compliance requirements, streamlining the process, and ensuring that all security and risk management practices meet the standards set by customs authorities. With our expertise, JDM Group helps businesses gain AEO status, boosting their credibility, enhancing operational efficiency, and improving their competitiveness in the global market. We are committed to ensuring a smooth, efficient, and compliant experience for our clients seeking to leverage the benefits of the AEO certification."
    },
    {
        "title": "Drawback",
        "para1": "A frequently asked question is whether or not JDM can recoup “drawback,” or duty already paid to Customs for exported cargo. The answer is “whenever possible!”",
        "para2": "Our staff is well aware that this is an important consideration for many importers/exporters, which is why we specialize in duty refunds for goods that have been marked for export following a period within the U.S. commerce system. If your business needs include drawback claims for manufactured, rejected, or unused merchandise, the need for accelerated drawback payment, waiver of prior notice of intent to export, or one-time waiver of prior notice of intent to export, JDM’s team will bring their expertise to bear on the issue and generate the best possible results."
    },
    {
        "title": "Insurance",
        "para1": "Although JDM does everything in our power to minimize the possibility of damage or loss of cargo in transit, the chance of an impossible-to-foresee disaster can never be completely removed.",
        "para2": "We encourage our customers to open a Cargo Policy to protect their precious cargo from catastrophic loss. Our rates are competitive, and, in the event of a claim, we will work with a government-approved company for settlement. Even the best-laid plans can still go awry."
    },
    {
        "title": "Packers & Movers",
        "para1": "Our wide expertise in the field allows us to provide efficient and quick packing and moving services of all kinds of goods and cargo to any part of the world as required by our customer with adopted packaging techniques of various products, depending on their fragility.",
        "para2": "With our In - house trucking services, we make sure for safe, intact and seamless deliverances to all our valued customers on time always."
    }
]

def seed():
    print("Deleting old Value Added Services...")
    ValueAddedService.objects.all().delete()
    for pos, vas in enumerate(vas_data):
        print(f"Creating VAS: {vas['title']} at position {pos}")
        ValueAddedService.objects.create(
            title=vas["title"],
            para1=vas["para1"],
            para2=vas["para2"],
            position=pos
        )
    print("Value Added Services seeded successfully!")

if __name__ == '__main__':
    seed()
