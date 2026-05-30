'use client'
import Link from "next/link"
import { useState } from 'react'
import { useIndustryVisibility } from "@/hooks/useIndustryVisibility"

export default function MobileMenu() {
	const [isAccordion, setIsAccordion] = useState(1)
	const { data: industrySpec } = useIndustryVisibility();

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return <>
		<div className="mobile-menu fix mb-3 mean-container">
			<div className="mean-bar">
				<Link href="/#nav" className="meanmenu-reveal" style={{ right: 0, left: 'auto', display: 'inline' }}>
					<span>
						<span>
							<span />
						</span>
					</span>
				</Link>
				<nav className="mean-nav">
					<ul>
						<li className="has-dropdown active menu-thumb">
							<Link href="/">
								Home
								<i className="fa-regular fa-plus" />
							</Link>
							<ul className="submenu has-homemenu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
								<li className="flex justify-content-center">
									<div className="homemenu-items">
										<div className="homemenu">
											<div className="homemenu-thumb mb-15">
												<img src="assets/img/header/home-2.jpg" alt="img" />
												<div className="demo-button">
													<Link href="/" className="theme-btn">
														Multi Page
													</Link>
												</div>
											</div>
											<div className="homemenu-content text-center">
												<h4 className="homemenu-title">
													Home
												</h4>
											</div>
										</div>
									</div>
								</li>
							</ul>
							<a className="mean-expand" onClick={() => handleAccordion(1)} style={{ fontSize: 18 }}>
								<i className="far fa-plus" /></a>
						</li>
						<li className="has-dropdown active d-xl-none">
							<Link href="/team" className="border-none">
								Home
								<i className="fa-regular fa-plus" />
							</Link>
							<ul className="submenu" style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
								<li><Link href="/">Home</Link></li>
							</ul>
							<a className="mean-expand" onClick={() => handleAccordion(2)} style={{ fontSize: 18 }}>
								<i className="far fa-plus" /></a>
						</li>
						<li>
							<Link href="/about">About Us</Link>
						</li>
						{/* <li className="has-dropdown">
							<Link href="/news">
								Pages
								<i className="fa-regular fa-plus" />
							</Link>
							<ul className="submenu" style={{ display: `${isAccordion == 3 ? "block" : "none"}` }}>
								<li><Link href="/team">Our Team</Link></li>
								<li><Link href="/team-details">Team Details</Link></li>
								<li><Link href="/pricing">Pricing</Link></li>
								<li><Link href="/faq">Faq's</Link></li>
								<li><Link href="/404">404 Page</Link></li>
							</ul>
							<a className="mean-expand" onClick={() => handleAccordion(3)} style={{ fontSize: 18 }}>
								<i className="far fa-plus" /></a>
						</li> */}
						<li>
							<Link href="/service">
								Services
								<i className="fa-regular fa-plus" />
							</Link>
							<ul className="submenu" style={{ display: `${isAccordion == 4 ? "block" : "none"}` }}>
								<li><Link href="/service">All Services</Link></li>
								<li><a href="/service-details">Air Freight Forwarding</a></li>
								<li><a href="/service-details">Ocean Freight Forwarding</a></li>
								<li><a href="/service-details">Rail Freight</a></li>
								<li><a href="/service-details">Road Transportation</a></li>
								<li><a href="/service-details">Customs Brokerage</a></li>
								<li><a href="/service-details">Project Management</a></li>
								<li><a href="/service-details">Courier Services</a></li>
								<li><a href="/service-details">Warehouse</a></li>
								<li><a href="/service-details">Packers & Movers</a></li>
								<li><a href="/service-details">Other Services</a></li>
							</ul>
							<a className="mean-expand" onClick={() => handleAccordion(4)} style={{ fontSize: 18 }}>
								<i className="far fa-plus" /></a>
						</li>
						<li>
							<Link href="/careers">Career</Link>
						</li>
						{industrySpec?.is_industry && (
							<li>
								<Link href="/industry">Industries</Link>
							</li>
						)}
						{/* <li>
							<Link href="/project">
								Projects
								<i className="fa-regular fa-plus" />
							</Link>
							<ul className="submenu" style={{ display: `${isAccordion == 5 ? "block" : "none"}` }}>
								<li><Link href="/project">Projects</Link></li>
								<li><Link href="/project-details">Project Details</Link></li>
							</ul>
							<a className="mean-expand" onClick={() => handleAccordion(5)} style={{ fontSize: 18 }}>
								<i className="far fa-plus" /></a>
						</li> */}
						{/* HIDDEN: News page temporarily disabled
						<li>
							<Link href="/news">
								News
								<i className="fa-regular fa-plus" />
							</Link>
							<ul className="submenu" style={{ display: `${isAccordion == 6 ? "block" : "none"}` }}>
								<li><Link href="/news-grid">News</Link></li>
							</ul>
							<a className="mean-expand" onClick={() => handleAccordion(6)} style={{ fontSize: 18 }}>
								<i className="far fa-plus" /></a>
						</li>
						*/}
						<li className="mean-last">
							<Link href="/contact">Contact Us</Link>
						</li>
					</ul>
				</nav></div></div>

	</>
}
