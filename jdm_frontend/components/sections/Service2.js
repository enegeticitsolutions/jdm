"use client"
// import "swiper/css";
import Link from "next/link"

import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	loop: true,

	// Navigation
	navigation: {
		nextEl: ".h1n",
		prevEl: ".h1p",
	},

	// Pagination
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		575: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		767: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		991: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		1199: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
}

export default function Service2() {
	return (
		<>
			<section className="service-section fix section-padding section-bg" id="services">
				<div className="bg-shape">
					<img src="assets/img/service/bg-shape.png" alt="img" />
				</div>
				<div className="container">
					<div className="section-title text-center">
						<h6 className="wow fadeInUp">
							<i className="fa-regular fa-arrow-left-long" />
							quality Services
							<i className="fa-regular fa-arrow-right-long" />
						</h6>
						<h2 className="text-white wow fadeInUp" data-wow-delay=".2s">
							Best Of our High Quality <br /> constriction
						</h2>
					</div>
				</div>
				<div className="container-fluid">
					<div className="swiper service-slider-2">
						<Swiper {...swiperOptions} className="swiper-wrapper">
							<SwiperSlide className="swiper-slide">
								<div className="service-card-items">
									<div className="service-image">
										<img src="assets/img/service/05.jpg" alt="img" />
									</div>
									<div className="bar-shape">
										<img src="assets/img/service/bar.png" alt="img" />
									</div>
									<div className="icon">
										<i className="fa-sharp fa-solid fa-plane-arrival" />
									</div>
									<div className="content">
										<h3>
											<Link href="service-details">ocean Freight</Link>
										</h3>
										<p>
										JDM provides cost-effective, reliable freight forwarding worldwide, handling bulk shipments via FCL, LCL, and vessel charters. We also manage documentation, insurance, and Letter of Credit processing for seamless delivery.
										</p>
										<Link href="service-details" className="link-btn">
											Explore More <i className="fa-solid fa-arrow-right" />
										</Link>
									</div>
									<div className="items-shape">
										<img src="assets/img/service/items-shape.png" alt="img" />
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<div className="service-card-items">
									<div className="service-image">
										<img src="assets/img/service/05.jpg" alt="img" />
									</div>
									<div className="bar-shape">
										<img src="assets/img/service/bar.png" alt="img" />
									</div>
									<div className="icon">
										<i className="fa-solid fa-plane" />
									</div>
									<div className="content">
										<h3>
											<Link href="service-details">Air Freight</Link>
										</h3>
										<p>
										We offer a comprehensive range of airfreight services worldwide. Each movement of Air Cargo is diligently planned by our expert team in close coordination with our worldwide agents to utilize the most economic air carriers that provide safe and speedy delivery.
										</p>
										<Link href="service-details" className="link-btn">
											Explore More <i className="fa-solid fa-arrow-right" />
										</Link>
									</div>
									<div className="items-shape">
										<img src="assets/img/service/items-shape.png" alt="img" />
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<div className="service-card-items">
									<div className="service-image">
										<img src="assets/img/service/05.jpg" alt="img" />
									</div>
									<div className="bar-shape">
										<img src="assets/img/service/bar.png" alt="img" />
									</div>
									<div className="icon">
										<i className="fas fa-landmark" />
									</div>
									<div className="content">
										<h3>
											<Link href="service-details">Road Transportation</Link>
										</h3>
										<p>
											JDM Group was conceptualized by Mr. Pahlad Singh in  the year 1978,with an initial start of Transportation in logistics field. Mr. Pahlad Singh who was well known in this industry for his true commitments and adding the value to your logistics mix.
										</p>
										<Link href="service-details" className="link-btn">
											Explore More <i className="fa-solid fa-arrow-right" />
										</Link>
									</div>
									<div className="items-shape">
										<img src="assets/img/service/items-shape.png" alt="img" />
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<div className="service-card-items">
									<div className="service-image">
										<img src="assets/img/service/05.jpg" alt="img" />
									</div>
									<div className="bar-shape">
										<img src="assets/img/service/bar.png" alt="img" />
									</div>
									<div className="icon">
										<i className="fa-sharp fa-solid fa-train" />
									</div>
									<div className="content">
										<h3>
											<Link href="service-details">Warehousing</Link>
										</h3>
										<p>
											JDM Group has its own warehousing facilities. JDM has grown rapidly in various other fields of logistics sphere by providing 3PL solutions in the form of warehousing, distribution and transload operations. It provide (MTO) to their esteemed clients
										</p>
										<Link href="service-details" className="link-btn">
											Explore More <i className="fa-solid fa-arrow-right" />
										</Link>
									</div>
									<div className="items-shape">
										<img src="assets/img/service/items-shape.png" alt="img" />
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<div className="service-card-items">
									<div className="service-image">
										<img src="assets/img/service/05.jpg" alt="img" />
									</div>
									<div className="bar-shape">
										<img src="assets/img/service/bar.png" alt="img" />
									</div>
									<div className="icon">
										<i className="fa-sharp fa-solid fa-train" />
									</div>
									<div className="content">
										<h3>
											<Link href="service-details">Packers & Movers</Link>
										</h3>
										<p>
										Our wide expertise in the field allows us to provide efficient and quick packing and moving services of all kinds of goods and cargo to any part of the world as required by our clients. We are adeptable in packaging techniques of different products, depending on their fragility.
										</p>
										<Link href="service-details" className="link-btn">
											Explore More <i className="fa-solid fa-arrow-right" />
										</Link>
									</div>
									<div className="items-shape">
										<img src="assets/img/service/items-shape.png" alt="img" />
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide className="swiper-slide">
								<div className="service-card-items">
									<div className="service-image">
										<img src="assets/img/service/05.jpg" alt="img" />
									</div>
									<div className="bar-shape">
										<img src="assets/img/service/bar.png" alt="img" />
									</div>
									<div className="icon">
										<i className="fa-sharp fa-solid fa-train" />
									</div>
									<div className="content">
										<h3>
											<Link href="service-details">Warehousing</Link>
										</h3>
										<p>
											JDM Group has its own warehousing facilities. JDM has grown rapidly in various other fields of logistics sphere by providing 3PL solutions in the form of warehousing, distribution and transload operations. It provide (MTO) to their esteemed clients
										</p>
										<Link href="service-details" className="link-btn">
											Explore More <i className="fa-solid fa-arrow-right" />
										</Link>
									</div>
									<div className="items-shape">
										<img src="assets/img/service/items-shape.png" alt="img" />
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
						<div className="swiper-dot mt-5">
							<div className="dot" />
						</div>
					</div>
				</div>
				<div className="container">
					<div className="service-pagi-items">
						<div className="service-dot" />
						<div className="array-buttons">
							<button className="array-prev h1p">
								<i className="fa-solid fa-arrow-left-long" />
							</button>
							<button className="array-next h1n">
								<i className="fa-solid fa-arrow-right-long" />
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
