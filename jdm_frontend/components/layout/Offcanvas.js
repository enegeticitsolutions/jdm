import Link from "next/link"
import MobileMenu from "./MobileMenu"

export default function Offcanvas({ isOffCanvas, handleOffCanvas }) {
	return (
		<>
			<div className="fix-area">
				<div className={`offcanvas__info ${isOffCanvas ? "info-open" : ""}`}>
					<div className="offcanvas__wrapper">
						<div className="offcanvas__content">
							<div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
								<div className="offcanvas__logo">
									<Link href="/">
										<img src="assets/img/logo/black-logo.jpg" alt="logo-img" />
									</Link>
								</div>
								<div className="offcanvas__close">
									<button onClick={handleOffCanvas}>
										<i className="fas fa-times" />
									</button>
								</div>
							</div>
							<p className="text d-none d-xl-block">
							Our mission is to provide operational excellence, competitive cost control and visibility to our customers who are globally sourcing and distributing in an integrated supply chain environment.
							</p>
							<MobileMenu />
							<div className="offcanvas__contact">
								<h4>Contact Info</h4>
								<ul>
									<li className="d-flex align-items-center">
										<div className="offcanvas__contact-icon">
											<i className="fal fa-map-marker-alt" />
										</div>
										<div className="offcanvas__contact-text">
											<Link target="_blank" href="#">
												A-75, New Delhi - 1100037, India
											</Link>
										</div>
									</li>
									<li className="d-flex align-items-center">
										<div className="offcanvas__contact-icon mr-15">
											<i className="fal fa-envelope" />
										</div>
										<div className="offcanvas__contact-text">
											<Link href="mailto:info@jdmgroups.com">
												<span className="mailto:info@jdmgroups.com">
													info@jdmgroups.com
												</span>
											</Link>
										</div>
									</li>
									<li className="d-flex align-items-center">
										<div className="offcanvas__contact-icon mr-15">
											<i className="fal fa-clock" />
										</div>
										<div className="offcanvas__contact-text">
											<Link target="_blank" href="#">
												Mod-friday, 09am -05pm
											</Link>
										</div>
									</li>
									<li className="d-flex align-items-center">
										<div className="offcanvas__contact-icon mr-15">
											<i className="far fa-phone" />
										</div>
										<div className="offcanvas__contact-text">
										<Link href="tel:+9149707070">+91-49707070-100 Lines</Link>
										</div>
									</li>
								</ul>
								<div className="header-button mt-4">
									<Link href="contact" className="theme-btn text-center">
										<span>
											Get A Quote
											<i className="fa-solid fa-arrow-right-long" />
										</span>
									</Link>
								</div>
								<div className="social-icon d-flex align-items-center">
								<Link href="https://www.facebook.com/profile.php?id=100090951694492">
									<i className="fab fa-facebook-f" />
								</Link>
								<Link href="https://x.com/home?lang=en">
									<i className="fab fa-twitter" />
								</Link>
								<Link href="https://www.instagram.com/we_jdm/">
									<i className="fab fa-instagram" />
								</Link>
								<Link href="https://www.linkedin.com/company/27983246" target="_blank">
									<i className="fab fa-linkedin-in" />
								</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`offcanvas__overlay ${isOffCanvas ? "overlay-open" : ""}`} onClick={handleOffCanvas} />
		</>
	)
}
