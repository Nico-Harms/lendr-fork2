"use client";

import { usePathname } from "next/navigation";
import Navigation from "../components/navigation";

export default function NavWrapper() {
  const pathname = usePathname();

  // Define routes where the Navigation should be hidden
  const hideNavigationOnRoutes = ["/opret-bruger", "/"];

  // Conditionally render the Navigation based on the current pathname
  if (hideNavigationOnRoutes.includes(pathname)) {
    return null; // Don't show navigation on these routes
  }

  return <Navigation />; // Show Navigation on all other routes
}
