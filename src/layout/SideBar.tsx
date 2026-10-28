import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { ArrowUpRight, CarFront, ChevronRight, LogOut, ShieldCheck, X } from "lucide-react";
import { toast } from "react-toastify";
import type { MouseEvent } from "react";
import { logOut, user } from "../redux/fetchers/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import BrandLogo from "../pages/shared/BrandLogo";
import { getDashboardNavigation } from "./dashboardNavigation";

interface SideBarProps {
  collapsed?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}

const SideBar = ({ collapsed = false, mobile = false, onNavigate }: SideBarProps) => {
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const role = currentUser?.role;
  const isAdmin = role === "admin";
  const groups = getDashboardNavigation(role);
  const initials = (currentUser?.email.slice(0, 2) || "AS").toUpperCase();
  const workspace = isAdmin ? "Admin workspace" : "My workspace";

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    onNavigate?.();
  };

  const handleLogout = () => {
    dispatch(logOut());
    onNavigate?.();
    toast.success("Logout Successfully!");
    navigate("/login", { replace: true });
  };

  if (role !== "admin" && role !== "user") return null;

  return (
    <aside className={`dashboard-sidebar${collapsed ? " dashboard-sidebar--collapsed" : ""}`} aria-label={workspace}>
      <div className="dashboard-sidebar__brand">
        <Link to="/" className="dashboard-sidebar__logo" aria-label="AutoSphere home" title={collapsed ? "AutoSphere home" : undefined} onClick={handleNavigation}>
          {collapsed ? <span className="dashboard-sidebar__mark"><CarFront aria-hidden="true" /></span> : <BrandLogo />}
        </Link>
        {mobile && <button type="button" className="dashboard-sidebar__close" aria-label="Close sidebar" onClick={onNavigate}><X aria-hidden="true" /></button>}
        <p className="dashboard-sidebar__workspace"><span aria-hidden="true" />{workspace}</p>
      </div>

      <nav className="dashboard-sidebar__navigation" id={`dashboard-navigation-${mobile ? "mobile" : "desktop"}`} aria-label={`${isAdmin ? "Admin" : "Account"} navigation`}>
        {groups.map((group) => (
          <div className="dashboard-sidebar__group" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map(({ name, path, Icon }) => {
                const productUpdate = isAdmin && path === "get-all-products" && pathname.startsWith("/admin/update-product/");
                return (
                  <li key={path}>
                    <NavLink
                      to={`/${role}/${path}`}
                      end
                      className={({ isActive }) => `dashboard-sidebar__link${isActive || productUpdate ? " dashboard-sidebar__link--active" : ""}`}
                      aria-label={name}
                      aria-current={productUpdate ? "page" : undefined}
                      title={collapsed ? name : undefined}
                      onClick={handleNavigation}
                    >
                      <Icon aria-hidden="true" />
                      <span>{name}</span>
                      <ChevronRight className="dashboard-sidebar__link-arrow" aria-hidden="true" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="dashboard-sidebar__footer">
        <Link className="dashboard-sidebar__website" to="/" aria-label="View website" title={collapsed ? "View website" : undefined} onClick={handleNavigation}>
          <ArrowUpRight aria-hidden="true" /><span>View website</span>
        </Link>
        <div className="dashboard-sidebar__account" title={collapsed ? currentUser?.email : undefined}>
          <span className="dashboard-sidebar__avatar" aria-hidden="true">{initials}</span>
          <div><p>{currentUser?.email}</p><span>{isAdmin ? <><ShieldCheck aria-hidden="true" />Administrator</> : "Personal account"}</span></div>
        </div>
        <button type="button" className="dashboard-sidebar__logout" onClick={handleLogout} aria-label="Log out" title={collapsed ? "Log out" : undefined}>
          <LogOut aria-hidden="true" /><span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
