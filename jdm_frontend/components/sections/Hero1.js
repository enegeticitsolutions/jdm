"use client"
// import "swiper/css";
import Link from "next/link"


import { useState } from "react"
import ModalVideo from "react-modal-video"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 2,
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
			slidesPerView: 1,
			spaceBetween: 30,
		},
		575: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		767: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		991: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1199: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
	},
}

export default function Hero1() {
	const [isOpen, setOpen] = useState(false)
	return (
		<>
			<section className="hero-section hero-1 fix section-padding">
				<div className="line-shape">
					<img src="assets/img/hero/line-shape.png" alt="img" />
				</div>
				<div className="container-fluid">
					<div className="row g-4">
						<div className="col-lg-7">
							<div className="hero-content">
								<div className="vector-shape">
									<img src="assets/img/hero/vector.png" alt="img" />
								</div>
								<div className="vector-shape-2">
									<img src="assets/img/hero/vector-2.png" alt="img" />
								</div>
								<h1 className="wow fadeInUp" data-wow-delay=".3s">
									Create the <br />
									building you <br />
									want here
								</h1>
								<p className="wow fadeInUp" data-wow-delay=".5s">
									Proactively pontificate client-centered relationships visavis
									process centric leadership skills. Credibly.
								</p>
								<div className="hero-button">
									<Link
										href="about"
										className="theme-btn bg-white wow fadeInUp"
										data-wow-delay=".3s"
									>
										Explore More
										<i className="fa-regular fa-arrow-right" />
									</Link>
									<span
										className="button-text wow fadeInUp"
										data-wow-delay=".5s"
									>
										<a
											onClick={() => setOpen(true)}
											className="video-btn video-popup"
										>
											<i className="fa-solid fa-play" />
										</a>
										<span className="ms-3 d-line">play reel</span>
									</span>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="hero-image-items">
								<div className="swiper hero-slider">
									<Swiper {...swiperOptions} className="swiper-wrapper">
										<SwiperSlide className="swiper-slide">
											<div className="hero-image">
												<img src="assets/img/hero/01.jpg" alt="img" />
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="hero-image">
												<img src="assets/img/hero/02.jpg" alt="img" />
											</div>
										</SwiperSlide>
										<SwiperSlide className="swiper-slide">
											<div className="hero-image">
												<img src="assets/img/hero/01.jpg" alt="img" />
											</div>
										</SwiperSlide>
									</Swiper>
									<div className="array-button">
										<button className="array-prevs h1p">
											<img src="assets/img/hero/prev.png" alt="img" />
											Previews
										</button>
										<button className="array-nexts h1n">
											Next <img src="assets/img/hero/next.png" alt="img" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ModalVideo
				channel="youtube"
				youtube={{ mute: 0, autoplay: 0 }}
				isOpen={isOpen}
				videoId="Cn4G2lZ_g2I"
				onClose={() => setOpen(false)}
			/>
		</>
	)
}
