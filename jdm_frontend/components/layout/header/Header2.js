import Link from "next/link"
import Menu from "../Menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu, isOffCanvas, handleOffCanvas, isSearch, handleSearch }) {
	return (
		<>
			<style>{`
				/* Social icons styling */
				.social-links a {
					// margin-left: 15px;
					font-size: 18px;
					display: flex;
					align-items: center;
				}

				/* Facebook */
				.social-links a.facebook i {
					color: #1877F2;
				}

				/* Twitter/X */
				.social-links a.twitter svg {
					color: #000000;
				}

				/* Instagram */
				.social-links a.instagram i {
					color: #E1306C;
				}

				/* LinkedIn */
				.social-links a.linkedin i {
					color: #0A66C2;
				}
			`}</style>

			<header className="header-section-2">
				<div className="container-fluid">
					<div id="header-sticky" className={`header-2 sticky`}>
						<div className="mega-menu-wrapper">
							<div className="header-main">
								<div className="header-left">
									<div className="logo">
										<Link href="/" className="header-logo">
											<img src="/assets/img/logo/black-logo.jpg" alt="logo-img" />
										</Link>
									</div>
								</div>

								<div className="header-right d-flex justify-content-end align-items-center">
									<div className="mean__menu-wrapper">
										<div className="main-menu">
											<Menu />
										</div>
									</div>

									<div className="header-button">
										<Link href="contact" className="theme-btn">
											GAT A QUOTE <i className="fa-regular fa-arrow-right" />
										</Link>
									</div>

									{/* SOCIAL ICONS */}
									<div className="search-item social-links d-none d-xl-flex">
										<Link href="https://www.facebook.com/profile.php?id=100090951694492" target="_blank" className="facebook">
											<i className="fab fa-facebook-f" />
										</Link>

										<Link href="https://x.com/JDMGroup" target="_blank" className="twitter">
											<FontAwesomeIcon icon={faXTwitter} />
										</Link>

										<Link href="https://www.instagram.com/we_jdm/" target="_blank" className="instagram">
											<i className="fab fa-instagram" />
										</Link>

										<Link href="https://www.linkedin.com/company/27983246" target="_blank" className="linkedin">
											<i className="fab fa-linkedin-in" />
										</Link>
									</div>

									<div className="header__hamburger d-xl-none my-auto">
										<div className="sidebar__toggle" onClick={handleOffCanvas}>
											<i className="fas fa-bars" />
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
