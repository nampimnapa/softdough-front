// // import Sidebar from "@components/admin-softdough/Sidebar";
// import Sidebar from "../components/admin-softdough/Sidebar";
// import Sidebarpro from "../components/staffpro/Sidebar";
// import "../styles/globals.css";
// import React from "react";
// import { Kanit } from "next/font/google";
// import { useRouter } from 'next/router';
// import { NextUIProvider } from "@nextui-org/react";
// // import { pages } from "next/dist/build/templates/app-page";

// const kanit = Kanit({
//   subsets: ["thai", "latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });


// export default function App({ Component, pageProps }) {
//   const { pathname } = useRouter();
//   return (
//     <React.Fragment>
//       <NextUIProvider>
//         {pathname.includes("Login") ?
//           <Component {...pageProps} />
//           :
//           <Sidebar className={kanit.className}>
//             <Component {...pageProps} />
//           </Sidebar>
//         }
//       </NextUIProvider>

//     </React.Fragment>
//   );
// }
// _app.tsx or _app.js

import SidebarAdmin from "../components/admin-softdough/Sidebar";
import SidebarStaff from "../components/staffpro/Sidebar";
import SidebarStaff1 from "../components/staffsell/Sidebar";
import "../styles/globals.css";
import React from "react";
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import { NextUIProvider } from "@nextui-org/react";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const adminPaths = ['/ingredients', '/dashboard', '/setting', '/manufacture', '/product', '/staff', '/expenses', '/promotion', '/sale','/notification'];
const staffPaths = ['/staffpro'];
const staffPaths1 = ['/staffsell'];
export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  const showStaffSidebar1 = staffPaths1.some(path => pathname.startsWith(path));
  const showStaffSidebar = staffPaths.some(path => pathname.startsWith(path));
  const showAdminSidebar = adminPaths.some(path => pathname.startsWith(path));

  return (
    <React.Fragment>
      <NextUIProvider>
        {pathname.includes("Login") ? (
          <Component {...pageProps} />
        ) : showStaffSidebar ? (  // Check staff sidebar first
          <SidebarStaff className={kanit.className}>
            <Component {...pageProps} />
          </SidebarStaff>

        ) : showStaffSidebar1 ? (  // Then check admin sidebar
          <SidebarStaff1 className={kanit.className}>
            <Component {...pageProps} />
          </SidebarStaff1>

        ) : showAdminSidebar ? (  // Then check admin sidebar
          <SidebarAdmin className={kanit.className}>
            <Component {...pageProps} />
          </SidebarAdmin>
        ) : (
          <Component {...pageProps} />
        )}
      </NextUIProvider>
    </React.Fragment>
  );
}

// _app.tsx or _app.js

// import SidebarAdmin from "../components/admin-softdough/Sidebar";
// import SidebarStaff from "../components/staffpro/Sidebar";
// import "../styles/globals.css";
// import React from "react";
// import { Kanit } from "next/font/google";
// import { useRouter } from 'next/router';
// import { NextUIProvider } from "@nextui-org/react";

// const kanit = Kanit({
//   subsets: ["thai", "latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// // Define path prefixes for each sidebar
// const adminPaths = ['/ingredients', '/dashboard', '/setting', '/manufacture', '/product', '/staff', '/expenses'];
// // const staffPaths = ['/staffpro'];

// function getSidebarType(pathname) {
//   console.log('Current pathname:', pathname);

//   if (pathname.includes('Login')) return 'none';
//   if (adminPaths.some(path => pathname.startsWith(path))) return 'admin';
//   // if (staffPaths.some(path => pathname.startsWith(path))) return 'staff';
//   return 'none';
// }

// export default function App({ Component, pageProps }) {
//   const { pathname } = useRouter();
//   const sidebarType = getSidebarType(pathname);
//   const showStaffSidebar = pathname.startsWith('/staffpro');

//   return (
//     <React.Fragment>
//       <NextUIProvider>
//         {sidebarType === 'none' ? (
//           <Component {...pageProps} />
//         ) : sidebarType === 'admin' ? (
//           <SidebarAdmin className={kanit.className}>
//             <Component {...pageProps} />
//           </SidebarAdmin>
//         ) : showStaffSidebar ? (
//           <SidebarStaff className={kanit.className}>
//             <Component {...pageProps} />
//           </SidebarStaff>
//         ) : (
//           <Component {...pageProps} />
//         )}
//       </NextUIProvider>
//     </React.Fragment>
//   );
// }

