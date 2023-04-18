import { useMediaQuery } from "react-responsive";

export const DesktopResponsive = ({ children }) => {

    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
};
export const TabletResponsive = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 760, maxWidth: 991 });

    return isTablet ? children : null;
};
export const MobileResponsive = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 759 });
    return isMobile ? children : null;
};

