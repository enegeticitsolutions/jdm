import Link from "next/link"

export default function OnePageNav() {
	return (
		<>
			<nav id="mobile-menu" className="d-none d-xl-block">
				<ul>
					<li className="has-dropdown active menu-thumb">
						<Link href="/">
							Home
							<i className="fa-regular fa-plus" />
						</Link>
						{/* <ul className="submenu has-homemenu">
							<li>
								<div className="homemenu-items">
									<div className="homemenu">
										<div className="homemenu-thumb">
											<img src="assets/img/header/home-1.jpg" alt="img" />
											<div className="demo-button">
												<Link href="/" className="theme-btn">
													Multi Page
												</Link>
												<Link href="/index-one-page" className="theme-btn">
													One Page
												</Link>
											</div>
										</div>
										<div className="homemenu-content text-center">
											<h4 className="homemenu-title">
												Home 01
											</h4>
										</div>
									</div>
									<div className="homemenu">
										<div className="homemenu-thumb mb-15">
											<img src="assets/img/header/home-2.jpg" alt="img" />
											<div className="demo-button">
												<Link href="/index-2" className="theme-btn">
													Multi Page
												</Link>
												<Link href="/index-two" className="theme-btn">
													One Page
												</Link>
											</div>
										</div>
										<div className="homemenu-content text-center">
											<h4 className="homemenu-title">
												Home 02
											</h4>
										</div>
									</div>
								</div>
							</li>
						</ul> */}
					</li>
					{/* <li className="has-dropdown active d-xl-none">
						<Link href="/team" className="border-none">
							Home
							<i className="fa-regular fa-plus" />
						</Link>
						<ul className="submenu">
							<li><Link href="/">Home 01</Link></li>
							<li><Link href="/index-2">Home 02</Link></li>
						</ul>
					</li> */}
					<li>
						<Link href="#about">About Us</Link>
					</li>
					<li>
						<Link href="#services">Services</Link>
					</li>
					<li>
						<Link href="#projects">Projects</Link>
					</li>
					<li>
						<Link href="#team">Team</Link>
					</li>
					<li>
						<Link href="#blog">Blog</Link>
					</li>
					<li>
						<Link href="#contact">Contact</Link>
					</li>
				</ul>
			</nav>

		</>
	)
}
