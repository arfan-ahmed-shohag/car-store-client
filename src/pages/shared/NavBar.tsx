import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { currentToken, logOut, user } from "../../redux/fetchers/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ThemeToggle } from "../component/themeToggle";
import BrandLogo from "./BrandLogo";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userToken = useSelector(currentToken);
  const userInfo = useSelector(user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    setIsVisible(false);
    toast.success("Logout Successfully!");
  };

  const linkClassName = ({ isActive }: { isActive: boolean }) => cn(
    "block rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:px-0",
    isActive
      ? "bg-brand/10 text-brand-strong md:bg-transparent"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-brand-strong dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-brand md:hover:bg-transparent md:dark:hover:bg-transparent",
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand/25 bg-white text-zinc-900 shadow-lg shadow-black/5 transition-colors duration-200 dark:bg-brand-ink dark:text-zinc-100">
      <div className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-2 px-5 sm:gap-3 sm:px-8">
        <Link to="/" aria-label="AutoSphere home" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" onClick={() => setIsVisible(false)}>
          <BrandLogo themeAware />
        </Link>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={cn(
            "absolute inset-x-0 top-20 border-b border-zinc-200 p-5 shadow-lg dark:border-white/10 md:static md:block md:border-0 md:p-0 md:shadow-none",
            isVisible ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end={item.path === "/"} className={linkClassName} onClick={() => setIsVisible(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            {userToken && (
              <li>
                <NavLink to={`/${userInfo?.role}/dashboard`} className={linkClassName} onClick={() => setIsVisible(false)}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle className="border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-brand-strong dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-brand" />
          {userToken ? (
            <Button size="sm" className="bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand" onClick={handleLogout}>Log out</Button>
          ) : (
            <Button asChild size="sm" className="bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-zinc-200 dark:hover:bg-white/10 md:hidden"
            onClick={() => setIsVisible((visible) => !visible)}
            aria-controls="main-navigation"
            aria-expanded={isVisible}
            aria-label={isVisible ? "Close main menu" : "Open main menu"}
          >
            {isVisible ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
