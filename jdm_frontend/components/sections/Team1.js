import Link from "next/link"

export default function Team1() {
	return (
		<>
			<section
				className="team-section fix section-padding bg-cover" id="team"
				style={{ backgroundImage: 'url("assets/img/team/bg-shape.png")' }}
			>
				<div className="container">
					<div className="section-title text-center">
						<h6 className="wow fadeInUp">
							<i className="fa-regular fa-arrow-left-long" />
							our team
							<i className="fa-regular fa-arrow-right-long" />
						</h6>
						<h2 className="wow fadeInUp" data-wow-delay=".2s">
							Our expert team <br /> members
						</h2>
					</div>
					<div className="row">
						<div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUps">
							<div className="team-card-items">
								<div className="team-image">
									<img src="assets/img/team/01.jpg" alt="img" />
									<div className="social-icon d-flex align-items-center">
										<Link href="#">
											<i className="fab fa-facebook-f" />
										</Link>
										<Link href="#">
											<i className="fab fa-twitter" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-linkedin-in" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-youtube" />
										</Link>
									</div>
								</div>
								<div className="team-content">
									<span>Sr. engineer</span>
									<h3>
										<Link href="team-details" />
										Shikhon Islam
									</h3>
								</div>
							</div>
						</div>

						<div
							className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
							data-wow-delay=".2s"
						>
							<div className="team-card-items">
								<div className="team-image">
									<img src="assets/img/team/02.jpg" alt="img" />
									<div className="social-icon d-flex align-items-center">
										<Link href="#">
											<i className="fab fa-facebook-f" />
										</Link>
										<Link href="#">
											<i className="fab fa-twitter" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-linkedin-in" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-youtube" />
										</Link>
									</div>
								</div>
								<div className="team-content">
									<span>Sr. engineer</span>
									<h3>
										<Link href="team-details" />
										Kawser Ahmed
									</h3>
								</div>
							</div>
						</div>

						<div
							className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
							data-wow-delay=".4s"
						>
							<div className="team-card-items">
								<div className="team-image">
									<img src="assets/img/team/03.jpg" alt="img" />
									<div className="social-icon d-flex align-items-center">
										<Link href="#">
											<i className="fab fa-facebook-f" />
										</Link>
										<Link href="#">
											<i className="fab fa-twitter" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-linkedin-in" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-youtube" />
										</Link>
									</div>
								</div>
								<div className="team-content">
									<span>Sr. engineer</span>
									<h3>
										<Link href="team-details" />
										Marvin McKinney
									</h3>
								</div>
							</div>
						</div>

						<div
							className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
							data-wow-delay=".6s"
						>
							<div className="team-card-items">
								<div className="team-image">
									<img src="assets/img/team/04.jpg" alt="img" />
									<div className="social-icon d-flex align-items-center">
										<Link href="#">
											<i className="fab fa-facebook-f" />
										</Link>
										<Link href="#">
											<i className="fab fa-twitter" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-linkedin-in" />
										</Link>
										<Link href="#">
											<i className="fa-brands fa-youtube" />
										</Link>
									</div>
								</div>
								<div className="team-content">
									<span>Sr. engineer</span>
									<h3>
										<Link href="team-details" />
										Sohel Islam
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
