import { Link, NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible";
import { currentToken, logOut, user } from "../../redux/fetchers/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ThemeToggle } from "../component/themeToggle";
import BrandLogo from "./BrandLogo";
import "./NavBar.css";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const userToken = useSelector(currentToken);
  const userInfo = useSelector(user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsVisible(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setIsVisible(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isVisible]);

  const handleLogout = () => {
    dispatch(logOut());
    setIsVisible(false);
    toast.success("Logout Successfully!");
  };

  const linkClassName = ({ isActive }: { isActive: boolean }) => cn(
    "site-header__link",
    isActive && "site-header__link--active",
  );

  const navigationItems = userToken
    ? [...menuItems, { label: "Dashboard", path: `/${userInfo?.role}/dashboard` }]
    : menuItems;

  const navigationLinks = () => (
    <ul className="site-header__links">
      {navigationItems.map((item) => (
        <li key={item.path}>
          <NavLink to={item.path} end={item.path === "/"} className={linkClassName} onClick={() => setIsVisible(false)}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <Collapsible open={isVisible} onOpenChange={setIsVisible} asChild>
      <header className="site-header" ref={headerRef}>
        <div className="site-header__inner">
          <Link to="/" aria-label="AutoSphere home" className="site-header__brand" onClick={() => setIsVisible(false)}>
            <BrandLogo themeAware />
          </Link>
          <nav aria-label="Main navigation" className="site-header__desktop-nav">{navigationLinks()}</nav>
          <div className="site-header__actions">
            <ThemeToggle className="site-header__icon" />
            {userToken ? (
              <Button type="button" className="site-header__auth" onClick={handleLogout}><LogOut aria-hidden="true" /><span>Log out</span></Button>
            ) : (
              <Button asChild className="site-header__auth">
                <Link to="/login" onClick={() => setIsVisible(false)}><LogIn aria-hidden="true" /><span>Login</span></Link>
              </Button>
            )}
            <CollapsibleTrigger asChild aria-controls="main-navigation">
              <button
                ref={menuButtonRef}
                type="button"
                className="site-header__icon site-header__menu-toggle"
                aria-label={isVisible ? "Close main menu" : "Open main menu"}
              >
                {isVisible ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent id="main-navigation" className="site-header__mobile-nav" asChild>
          <nav aria-label="Mobile navigation"><div className="site-header__mobile-container">{navigationLinks()}</div></nav>
        </CollapsibleContent>
      </header>
    </Collapsible>
  );
};

export default NavBar;
