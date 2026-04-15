"use client";

import { useServiceData } from "@/hooks/useServiceData";
import { useIndustryVisibility } from "@/hooks/useIndustryVisibility";
import Link from "next/link";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";

export default function Menu() {
  const { data: servicesData, isLoading: loadingServices, isError: errorServices } = useServiceData();
  const { data: industrySpec, isLoading: loadingSpec, isError: errorSpec } = useIndustryVisibility();
  const pathname = usePathname();

  if (loadingServices || loadingSpec) return <Loading />;
  if (errorServices || errorSpec) return <p>Error loading menu.</p>;

  const menuItems = [
    { title: "Home", href: "/", submenu: null },
    { title: "About Us", href: "/about", submenu: null },
    {
      title: "Services",
      href: "/service",
      submenu: servicesData
        ? [
          ...servicesData.map((service) => ({
            title: service.title,
            href: `/service-details/${service.slug || service.id}`,
          })),

          // ⭐ Add Value Added Service (special page)
          {
            title: "Value Added Services",
            href: "/value-added-services",
          }
        ]
        : null,

    },
    { title: "Gallery", href: "/gallery", submenu: null },
    // HIDDEN: Industry page temporarily disabled
    // ...(industrySpec?.is_industry
    //   ? [{ title: "Industries", href: "/industry", submenu: null }]
    //   : []),
    { title: "Careers", href: "/careers", submenu: null },
    // HIDDEN: News page temporarily disabled
    // { title: "News", href: "/news", submenu: [{ title: "All News", href: "/news-grid" }] },
    { title: "Contact Us", href: "/contact", submenu: null },
  ];

  const isActive = (href, submenu) => {
    if (pathname === href) return true;
    if (submenu) return submenu.some((sub) => pathname.startsWith(sub.href));
    return false;
  };

  return (
    <nav id="mobile-menu" className="d-none d-xl-block">
      <ul>
        {menuItems.map((item, index) => {
          const active = isActive(item.href, item.submenu);
          return (
            <li key={index} className={`${item.submenu ? "has-dropdown" : ""}${active ? " active theme-highlight" : ""}`}>
              <Link href={item.href}>
                {item.title}
                {item.submenu && <i className="fa-regular fa-plus" />}
              </Link>
              {item.submenu && (
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link href={subItem.href}>{subItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
