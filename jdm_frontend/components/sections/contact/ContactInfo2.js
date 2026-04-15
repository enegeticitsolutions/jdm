// import React from "react";

// export default function ContactInfo2({ iframe }) {
//   const isValidIframe = iframe && iframe.startsWith("https://");

//   return (
//     <div className="office-google-map-wrapper">
//       {isValidIframe ? (
//         <iframe
//           src={iframe}
//           style={{ border: 0, width: "100%", height: "450px", display: "block" }}
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         />
//       ) : (
//         <p style={{ color: "red", padding: "1rem", textAlign: "center" }}>
//           Please enter a correct iframe link.
//         </p>
//       )}
//     </div>
//   );
// }


import React from "react";

export default function ContactInfo2() {
  // Google Maps embed with place name + coordinates
  const iframeURL =
    "https://www.google.com/maps?q=JDM%20Groups@28.5491845,77.1287988&z=17&output=embed";

  return (
    <div className="office-google-map-wrapper" style={{ marginTop: "40px" }}>
      <iframe
        title="JDM Groups Location"
        src={iframeURL}
        style={{
          border: 0,
          width: "100%",
          height: "300px",
          display: "block",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
