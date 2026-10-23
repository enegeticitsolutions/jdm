import Link from "next/link"
import MobileMenu from "./MobileMenu"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Offcanvas({ isOffCanvas, handleOffCanvas }) {
	const [socialLinks, setSocialLinks] = useState(null)
	const [contactInfo, setContactInfo] = useState(null)

	useEffect(() => {
		async function fetchSocialLinks() {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/social-media-links/`)
				if (res.ok) {
					const data = await res.json()
					setSocialLinks(data)
				}
			} catch (error) {
				console.error("Failed to fetch social media links:", error)
			}
		}
		async function fetchContact() {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/contact/`)
				if (res.ok) {
					const data = await res.json()
					setContactInfo(data)
				}
			} catch (error) {
				console.error("Failed to fetch contact info:", error)
			}
		}
		fetchSocialLinks()
		fetchContact()
	}, [])

	return (
		<>
			<style>{`
				/* New social icons styling for Offcanvas to match navbar */
				.offcanvas__contact .new-social-icons a {
					font-size: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 15px;
					width: auto;
					height: auto;
					border: none;
					border-radius: 0;
					background: transparent;
				}
				.offcanvas__contact .new-social-icons a:hover {
					background: transparent;
					color: inherit;
				}

				/* Facebook */
				.offcanvas__contact .new-social-icons a.facebook i { color: #1877F2; }
				/* Twitter/X */
				.offcanvas__contact .new-social-icons a.twitter svg { color: #000000; }
				/* Instagram */
				.offcanvas__contact .new-social-icons a.instagram i { color: #E1306C; }
				/* LinkedIn */
				.offcanvas__contact .new-social-icons a.linkedin i { color: #0A66C2; }
			`}</style>
			<div className="fix-area">
				<div className={`offcanvas__info ${isOffCanvas ? "info-open" : ""}`}>
					<div className="offcanvas__wrapper">
						<div className="offcanvas__content">
							<div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
								<div className="offcanvas__logo">
									<Link href="/">
										<img src="/assets/img/logo/JDM New Logo.png" alt="JDM Logo" />
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
												{contactInfo?.address || "A-75, Road No. 4, Street No. 6, Mahipalpur Extn., New Delhi 110037"}
											</Link>
										</div>
									</li>
									<li className="d-flex align-items-center">
										<div className="offcanvas__contact-icon mr-15">
											<i className="fal fa-envelope" />
										</div>
										<div className="offcanvas__contact-text">
											<Link href={`mailto:${contactInfo?.email || "info@jdmgroups.com"}`}>
												<span className={`mailto:${contactInfo?.email || "info@jdmgroups.com"}`}>
													{contactInfo?.email || "info@jdmgroups.com"}
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
												Mon-Sat, 9:30 am - 6:30 pm
											</Link>
										</div>
									</li>
									<li className="d-flex align-items-center">
										<div className="offcanvas__contact-icon mr-15">
											<i className="far fa-phone" />
										</div>
										<div className="offcanvas__contact-text">
											<Link href={`tel:${contactInfo?.phone || "+9149707070"}`}>{contactInfo?.phone || "+91-49707070-100"}</Link>
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
								<div className="social-icon d-flex align-items-center new-social-icons">
									{socialLinks?.facebook_url && (
										<Link href={socialLinks.facebook_url} target="_blank" className="facebook">
											<i className="fab fa-facebook-f" />
										</Link>
									)}
									{socialLinks?.twitter_url && (
										<Link href={socialLinks.twitter_url} target="_blank" className="twitter">
											<FontAwesomeIcon icon={faXTwitter} />
										</Link>
									)}
									{socialLinks?.instagram_url && (
										<Link href={socialLinks.instagram_url} target="_blank" className="instagram">
											<i className="fab fa-instagram" />
										</Link>
									)}
									{socialLinks?.linkedin_url && (
										<Link href={socialLinks.linkedin_url} target="_blank" className="linkedin">
											<i className="fab fa-linkedin-in" />
										</Link>
									)}
									{!socialLinks && (
										<>
											<Link href="https://www.facebook.com/profile.php?id=100090951694492" target="_blank" className="facebook">
												<i className="fab fa-facebook-f" />
											</Link>
											<Link href="https://x.com/home?lang=en" target="_blank" className="twitter">
												<FontAwesomeIcon icon={faXTwitter} />
											</Link>
											<Link href="https://www.instagram.com/we_jdm/" target="_blank" className="instagram">
												<i className="fab fa-instagram" />
											</Link>
											<Link href="https://www.linkedin.com/company/27983246" target="_blank" className="linkedin">
												<i className="fab fa-linkedin-in" />
											</Link>
										</>
									)}
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
