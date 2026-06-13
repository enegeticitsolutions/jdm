import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from core.models import Service, ServiceBenefit

services_data = [
  {
    "id": "air-freight",
    "title": "Air Freight",
    "image": "services/Air Freight.webp",
    "description": "Fast and reliable air freight services for global shipping.",
    "icon": "fa-regular fa-plane",
    "description1": 'We offer comprehensive range of airfreight services worldwide. Each movement of Air Cargo is diligently planned by our experts in close coordination with our worldwide agents to utilize the most economic air carriers that provide safe and speedy delivery. Strong relationships with all leading airlines enable us to secure space with reasonable price in all significant sectors. Exporters/Importers of specialized cargo, Automotive cargo, Electronics cargo, high value cargo, perishable cargo, Hazardous/Dangerous goods cargo and many other types of cargoes can rely on us for providing them value addition with our state-of-the-art services. We offer **"consolidations, Back to Back, Door to Door, and Airport to Airport"** services as per the requirements of our valued customers.',
  },
  {
    "id": "ocean-freight",
    "title": "Ocean Freight",
    "image": "services/Inside Ship.webp",
    "description": "Cost-effective ocean freight solutions for bulk shipments.",
    "icon": "fa-regular fa-ship",
    "description1": "We understand that **ocean freight is the backbone of global trade,** playing a pivotal role in connecting supply chains across continents. Our ocean freight solutions are built on a foundation of cost-effectiveness, **reliability, safety, and timely delivery,** offering seamless movement through **FCL, LCL, Reefer, and specialized vessel charters** equipped with onboard cranes for heavy or oversized cargo. With a team of highly qualified professionals, we manage both **bulk and liquid commodities** with unmatched precision and care. While our ocean division continues to expand, we bring **modern flexibility** to every shipment — from selecting the ideal carrier to arranging last-mile delivery. By leveraging our vast partner network and working in sync with shipping lines, we ensure your cargo reaches even the most remote interiors of the country and across borders, all at an optimized cost and with complete transparency.",
  },
  {
    "id": "train-freight",
    "title": "Rail Freight",
    "image": "services/Train Freight.webp",
    "description": "Efficient train freight services for regional transport.",
    "icon": "fa-regular fa-train",
    "description1": "We recognize the immense value of rail freight as a highly efficient and reliable mode of transport, particularly for the movement of large volumes of goods over medium to long distances. Leveraging rail transport enables us to reduce the number of trips required for large-scale shipments, leading to significant cost savings and a marked reduction in the environmental footprint of logistics operations. Rail freight is less susceptible to traffic congestion and adverse weather conditions compared to road transport, ensuring reliable and timely deliveries, even in challenging circumstances. This capability is particularly advantageous for industries such as manufacturing, agriculture, and mining, where demand for scalable, secure, and cost-effective transportation solutions is paramount. We harness the power of rail freight to optimize supply chain efficiency, ensuring seamless operations while remaining fully compliant with industry standards and environmental regulations.",
    "description2": "By integrating rail transport into our comprehensive logistics offerings, we further our commitment to sustainability, delivering reliable, green, and cost-efficient solutions to our clients.",
  },
  {
    "id": "road-transportation",
    "title": "Road Transportation",
    "image": "services/Transport.webp",
    "description": "Flexible road transportation for local and regional deliveries.",
    "icon": "fa-regular fa-truck-fast",
    "description1": 'JDM GROUP was conceptualized by Late Mr. Pahlad Singh in the year 1978, with an initial starting of Road Transportation in logistics field. His desire towards the value services and deep understanding of Logistics, made the foundations of the organization stronger and today these two aspects are our guiding principles. <br> Road Transportation is one of the vital parts of modern logistics segment and its cycles begin with pick-up of cargo/consignments to and from the designated port, customs station and/or warehouses. Today we are one of the leading and promising Logistics partners associated with some of the best corporate houses. We firmly believe in "Just in Time" concept by providing seamless Logistics support to our valued customer through our well informed and experienced staff. ** We are progressing toward the greener future by adopting electric vehicles and removing emissions-heavy alternatives, in Alignment with the Mission 2050 initiative.**',
  },
  {
    "id": "custom-clearance",
    "title": "Custom Brokerage",
    "image": "services/Customs Brokrage.webp",
    "description": "Seamless custom clearance services for international shipments.",
    "icon": "fa-regular fa-file-signature",
    "description1": "We have an adept team of Customs Brokerage professionals with years of experience, who are proficient not only with Custom's procedures and regulations but also with the allied laws. We assist in effectively and efficiently filing of all customs-related compliances across multiple regulatory agencies, includes additional facilitations for:",
    "benefits": [
      "Special Economic Zones (SEZ)",
      "Software Technology Parks of India (STPI)",
      "Free Trade and Warehousing Zone (FTWZ)",
      "Export Promotion Capital Goods (EPCG)",
      "Import of Goods at Concessional Rate of Duty (IGCR)",
      "Manufacturing and Other Operations in a Warehouse Rules (MOOWR)",
    ],
  },
  {
    "id": "value-added-services",
    "title": "Value Added Services",
    "image": "services/Warehouse.webp",
    "description": "Explore JDM Logistics' additional value added services including SVB, drawback, insurance and consulting.",
    "icon": "fa-regular fa-hand-holding-heart",
    "description1": "Explore JDM Logistics' additional services including SVB, drawback, cargo insurance, and online filing.",
  },
  {
    "id": "project-cargo",
    "title": "Project Cargo",
    "image": "services/Project Cargo.webp",
    "description": "Specialized handling for oversized and complex cargo.",
    "icon": "fa-regular fa-box-open",
    "description1": "We take immense pride in offering **comprehensive project cargo handling services** that consistently exceed client expectations. From infrastructure giants to energy sector leaders, our clients trust us to move their most challenging and oversized cargo with unmatched precision. Our team, comprising **highly trained and experienced professionals**, brings meticulous planning and hands-on expertise to every project — be it **Over Dimensional Cargo (ODC)** or **Overweight Cargo (OWC)**. Utilizing **specialized equipment** like open-top and flat-rack containers, we handle end-to-end execution — starting from **vessel booking, route optimization, to safe on-board loading.** Our longstanding relationships with leading vessel owners allow us to offer **cost-effective solutions without compromising service quality.** What sets us apart is our ability to adapt to the complexity of each shipment, ensuring it is moved securely, timely, and in compliance with international standards. It's a mission delivered with integrity, care, and commitment.",
  },
  {
    "id": "warehousing",
    "title": "Warehousing",
    "image": "services/Warehouse.webp",
    "description": "Secure and scalable warehousing solutions.",
    "icon": "fa-regular fa-warehouse",
    "description1": "We have grown rapidly in 5PL solutions in the form of warehousing, distribution and trans-load operations. We have the capabilities to serve right from packing, loading/unload, customs brokerage, inventory control, warehouse management, transportation, includes multi model transportation, to our esteemed customers and final distribution to the retail outlets in a cost-effective manner with safe and intact deliveries.",
    "benefits": [
      "Cost effective & safety of goods",
      "Our warehouse has zero liability to end clients",
      "Warehouse distance -4 km from New Delhi Airport",
      "Round the clock 24xl security equipped with security camera etc",
      "Hi-tech sophisticated handling equipment’s for taking appropriate care of your cargo",
    ],
    "heading": " Warehousing of Goods in Public and Private Bonded Warehouses",
    "description2": "As an emerging leader in the warehousing services, we also assist our esteemed customers to warehouse the goods in public & private bonded warehouses (governed under customs act/rules) for better supply chain, inventory control, and deferred customs duty payments.",
  },
  {
    "id": "courier-services",
    "title": "Courier Service",
    "image": "services/Courier.webp",
    "description": "Express courier services for urgent deliveries.",
    "icon": "fa-regular fa-truck-front",
    "description1": "We specialize in providing **customized, door-to-door express delivery solutions** designed to meet the fast-paced demands of modern business. Our courier services are tailored for the **swift and secure movement of time-sensitive documents and parcels** to destinations across the globe. Backed by a robust international network and diverse transit time options, we ensure, shipments reach on schedule, no matter the urgency or complexity. <br> What truly distinguishes our service is our approach: **before proposing a solution, we take time to understand your business challenge**, offering logistics that are not only efficient but also strategically aligned with your goals. Every package entrusted to us is handled with the utmost care, backed by advanced tracking systems and stringent safety protocols. Whether it’s an urgent contract, confidential paperwork, or a vital product sample, **we guarantee secure, reliable, and on-time global delivery — every time.**",
  },
  {
    "id": "perishable-cargo",
    "title": "Perishable Cargo",
    "image": "services/Perishable Cargo.webp",
    "description": "Express Cargo services for urgent deliveries.",
    "icon": "fa-regular fa-truck-front",
    "description1": "We are trusted for delivering reliable, specialized logistics solutions for the export and import of perishable commodities, including vegetables, fruits, cut flowers, and other temperature-sensitive goods. What sets us apart is our deep understanding of the time-critical nature of perishables and our commitment to maintaining their freshness, quality, and safety at every stage of transit. Our team is trained in cold chain handling, ensuring proper packaging, temperature control, and hygiene protocols from origin to destination. Whether it’s a rose bouquet to Europe or fresh produce to the Middle East, we manage it with precision, speed, and care. With international expertise and a customer-centric approach, for goods that can’t wait, trust the team that never rests.",
  },
  {
    "id": "exhibition-cargo",
    "title": "Handling of Exhibition Cargo",
    "image": "services/exhibition.webp",
    "description": "Express Cargo services for urgent deliveries.",
    "icon": "fa-regular fa-truck-front",
    "description1": "We proudly hold a distinct reputation in managing exhibition cargo for both inward and outward movements with absolute precision and regulatory compliance. Whether its goods headed for the India Trade Promotion Organization (ITPO), or materials bound for public or privately funded seminars, expos, or demonstrations, our experienced team ensures smooth execution aligned with all customs regulations and procedural guidelines. We specialize in handling shipments governed under ATA Carnet and related exhibition protocols, offering tailored solutions for high-value display items, fragile exhibits, and demonstration kits. From meticulous planning to seamless delivery at the event site, we manage the entire logistics chain — ensuring that your materials arrive on time, intact, and exhibition-ready. With extensive knowledge of international exhibition standards and documentation formalities, we are your trusted partner for delivering excellence on the global exhibition stage.",
  }
]


def seed():
    Service.objects.all().delete()
    for pos, s_data in enumerate(services_data):
        print(f"Creating {s_data['title']}")
        service = Service.objects.create(
            title=s_data['title'],
            image=s_data['image'],
            description=s_data.get('description', ''),
            icon=s_data.get('icon', ''),
            description1=s_data.get('description1', ''),
            description2=s_data.get('description2', ''),
            heading=s_data.get('heading', ''),
            position=pos
        )
        benefits = s_data.get('benefits', [])
        for ben in benefits:
            ServiceBenefit.objects.create(service=service, text=ben)
    print("Seeded services!")

if __name__ == '__main__':
    seed()
