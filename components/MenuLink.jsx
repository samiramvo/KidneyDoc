// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import "@/styles/globals.css";

// const MenuLink = ({ item }) => {
//   const pathname = usePathname();

//   return (
//     <Link
//       href={item.path}
//       className={`containerlink ${pathname === item.path ? "active" : ""} ${
//         !item.expanded ? "collapsed" : ""
//       }`}
//       title={item.title}
//     >
//       {item.icon}
//       {item.title && (
//         <span className={`text ${item.expanded ? "visible" : "hidden"}`}>
//           {item.title}
//         </span>
//       )}
//     </Link>
//   );
// };

// export default MenuLink;
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`containerlink flex items-center space-x-2 py-2 ${
        pathname === item.path ? "active" : ""
      } ${!item.expanded ? "collapsed" : ""}`}
      title={item.title}
    >
      <span>{item.icon}</span>
      <span className={`text ${item.expanded ? "inline" : "hidden"}`}>
        {item.title}
      </span>
    </Link>
  );
};

export default MenuLink;
