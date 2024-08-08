// // import Sidebar from "@components/admin-softdough/Sidebar";
// import Sidebar from "../components/admin-softdough/Sidebar";
// import "../styles/globals.css";
// import React from "react";
// import { Kanit } from "next/font/google";
// import { useRouter } from 'next/router';
// import {NextUIProvider} from "@nextui-org/react";
// // import { pages } from "next/dist/build/templates/app-page";

// const kanit = Kanit({
//   subsets: ["thai", "latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// // function App({ Component, pageProps }) {
// //   // ตรวจสอบหน้า login โดยให้ render โดยไม่ใส่ Sidebar
// //   if (Component.name === "LoginPage") {
// //     return <Component {...pageProps} />;
// //   }
// //   return (
// //     <React.Fragment>
// //       <Sidebar className={kanit.className}>
// //         <Component {...pageProps} />
// //       </Sidebar>
// //     </React.Fragment>
// //   );
// // }
// // export default App;
// export default function App({ Component, pageProps }) {
//   const { pathname } = useRouter();
//   return (
//     <React.Fragment>
//       <NextUIProvider>
//       {pathname.includes("Login") ?
//         <Component {...pageProps} />
//         :
//         <Sidebar className={kanit.className}>
//           <Component {...pageProps} />
//         </Sidebar>
//       }
//       </NextUIProvider>

//     </React.Fragment>
//   );
// }



import SidebarAdmin from "../components/admin-softdough/Sidebar";
import SidebarStaff from "../components/staffsell/Sidebar";
import "../styles/globals.css";
import React from "react";
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import { NextUIProvider } from "@nextui-org/react";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const adminPaths = ['/ingredients', '/dashboard', '/setting', '/manufacture', '/product', '/staff', '/expenses','/promotion'];
const staffPaths = ['/staffsell'];
export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();


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

