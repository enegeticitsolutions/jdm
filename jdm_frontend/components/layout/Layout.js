// "use client"
// import { useEffect, useState } from "react"
// // import AddClassBody from "../elements/AddClassBody"
// import BackToTop from "../elements/BackToTop"
// import Breadcrumb from "./Breadcrumb"
// import Footer2 from "./footer/Footer2"
// import Header2 from "./header/Header2"
// import Offcanvas from "./Offcanvas"

// export default function Layout({
// 	headerStyle,
// 	footerStyle,
// 	breadcrumbTitle,
// 	children,
// 	backgroundImage
// }) {
// 	const [scroll, setScroll] = useState(0)
// 	// MobileMenu
// 	const [isMobileMenu, setMobileMenu] = useState(false)
// 	const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

// 	// OffCanvas
// 	const [isOffCanvas, setOffCanvas] = useState(false)
// 	const handleOffCanvas = () => setOffCanvas(!isOffCanvas)

// 	// Search
// 	// const [isSearch, setSearch] = useState(false)
// 	// const handleSearch = () => setSearch(!isSearch)

// 	useEffect(() => {
// 		const WOW = require("wowjs")
// 		window.wow = new WOW.WOW({
// 			live: false,
// 		})
// 		window.wow.init()

// 		const onScroll = () => {
// 			setScroll(window.scrollY > 100)
// 		}

// 		window.addEventListener("scroll", onScroll)
// 		return () => window.removeEventListener("scroll", onScroll)
// 	}, [])
// 	return (
// 		<>
// 			<div id="top" />
// 			{/* <LinkddClassBody /> */}
// 			<div className="mouse-cursor cursor-outer" />
// 			<div className="mouse-cursor cursor-inner" />

// 			<Offcanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />

// 			{!headerStyle && (
// 				<Header2
// 					scroll={scroll}
// 					isMobileMenu={isMobileMenu}
// 					handleMobileMenu={handleMobileMenu}
// 					isOffCanvas={isOffCanvas}
// 					handleOffCanvas={handleOffCanvas}
// 					// isSearch={isSearch}
// 					// handleSearch={handleSearch}
// 				/>
// 			)}
// 			{headerStyle == 1 ? (
// 				<Header2
// 					scroll={scroll}
// 					isMobileMenu={isMobileMenu}
// 					handleMobileMenu={handleMobileMenu}
// 					isOffCanvas={isOffCanvas}
// 					handleOffCanvas={handleOffCanvas}
// 					// isSearch={isSearch}
// 					// handleSearch={handleSearch}
// 				/>
// 			) : null}
// 			{headerStyle == 2 ? (
// 				<Header2
// 					scroll={scroll}
// 					isMobileMenu={isMobileMenu}
// 					handleMobileMenu={handleMobileMenu}
// 					isOffCanvas={isOffCanvas}
// 					handleOffCanvas={handleOffCanvas}
// 					// isSearch={isSearch}
// 					// handleSearch={handleSearch}
// 				/>
// 			) : null}
// 			{headerStyle == 3 ? (
// 				<Header2
// 					scroll={scroll}
// 					isMobileMenu={isMobileMenu}
// 					handleMobileMenu={handleMobileMenu}
// 					isOffCanvas={isOffCanvas}
// 					handleOffCanvas={handleOffCanvas}
// 					// isSearch={isSearch}
// 					// handleSearch={handleSearch}
// 				/>
// 			) : null}
// 			{headerStyle == 4 ? (
// 				<Header2
// 					scroll={scroll}
// 					isMobileMenu={isMobileMenu}
// 					handleMobileMenu={handleMobileMenu}
// 					isOffCanvas={isOffCanvas}
// 					handleOffCanvas={handleOffCanvas}
// 					// isSearch={isSearch}
// 					// handleSearch={handleSearch}
// 				/>
// 			) : null}
// 			{/* <Search
// 				// isSearch={isSearch}
// 				handleSearch={handleSearch} /> */}

// 			<main className="main">
// 				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} backgroundImage={backgroundImage} />}

// 				{children}
// 			</main>

// 			{!footerStyle && <Footer2 />}
// 			{footerStyle == 1 ? <Footer2 /> : null}
// 			{footerStyle == 2 ? <Footer2 /> : null}

// 			<BackToTop target="#top" />
// 		</>
// 	)
// }
"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Added for the button link
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import Footer2 from "./footer/Footer2";
import Header2 from "./header/Header2";
import Offcanvas from "./Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Layout({
  headerStyle,
  footerStyle,
  breadcrumbTitle,
  children,
  backgroundImage,
}) {
  const [scroll, setScroll] = useState(0);
  // MobileMenu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => setMobileMenu(!isMobileMenu);

  // OffCanvas
  const [isOffCanvas, setOffCanvas] = useState(false);
  const handleOffCanvas = () => setOffCanvas(!isOffCanvas);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();

    const onScroll = () => {
      setScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="top" />
      <div className="mouse-cursor cursor-outer" />
      <div className="mouse-cursor cursor-inner" />

      <Offcanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />

      {!headerStyle && (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      )}
      {headerStyle == 1 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}
      {headerStyle == 2 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}
      {headerStyle == 3 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}
      {headerStyle == 4 ? (
        <Header2
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          isOffCanvas={isOffCanvas}
          handleOffCanvas={handleOffCanvas}
        />
      ) : null}

      <main className="main">
        {breadcrumbTitle && (
          <Breadcrumb
            breadcrumbTitle={breadcrumbTitle}
            backgroundImage={backgroundImage}
          />
        )}

        {children}

        {/* Floating Enquire Now Button */}
        <div className="floating-contact wow fadeInRight" data-wow-delay=".5s">
          <Link href="/contact">
            <button className="contact-btn">
			  <FontAwesomeIcon icon={faComment}/>
            </button>
          </Link>
        </div>
      </main>

      {!footerStyle && <Footer2 />}
      {footerStyle == 1 ? <Footer2 /> : null}
      {footerStyle == 2 ? <Footer2 /> : null}

      <BackToTop target="#top" />

      {/* Inline Styles for Floating Button */}
      <style jsx>{`
        .floating-contact {
          position: fixed;
          right: 20px;
          bottom:2%;
          z-index: 1000;
        }
        .contact-btn {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          background: var(--theme2);
          color: #fff;
			padding: 15px 15px;
			display: flex;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .contact-btn:hover {
          background: #d97706; /* Darker orange on hover */
        }
      `}</style>
    </>
  );
}