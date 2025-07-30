import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileFooter from "./MobileFooter";
import useIsMobile from "../hooks/useIsMobile";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout = ({
  children,
  showHeader = true,
  showFooter = true,
}: LayoutProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      {showHeader && <Header />}
      {children}
      {showFooter && (isMobile ? <MobileFooter /> : <Footer />)}
    </>
  );
};

export default Layout;
