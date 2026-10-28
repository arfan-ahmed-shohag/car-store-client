import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, PanelLeftClose, PanelLeftOpen, ShieldCheck, UserRound } from "lucide-react";
import { useAppSelector } from "../redux/hooks";
import { user } from "../redux/fetchers/auth/authSlice";
import { ThemeToggle } from "../pages/component/themeToggle";
import SideBar from "./SideBar";
import { getDashboardTitle } from "./dashboardNavigation";
import "./DashboardLayout.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = useAppSelector(user);
  const { pathname } = useLocation();
  const isAdmin = currentUser?.role === "admin";
  const pageTitle = getDashboardTitle(currentUser?.role, pathname);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${pageTitle} | AutoSphere ${isAdmin ? "Admin" : "Account"}`;
    return () => { document.title = previousTitle; };
  }, [pageTitle, isAdmin]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
      <div className={`dashboard-shell${collapsed ? " dashboard-shell--collapsed" : ""}`}>
        <a className="dashboard-shell__skip" href="#dashboard-content">Skip to content</a>
        <div className="dashboard-shell__desktop-sidebar"><SideBar collapsed={collapsed} /></div>

        <div className="dashboard-shell__main">
          <header className="dashboard-header">
            <div className="dashboard-header__context">
              <button
                type="button"
                className="dashboard-header__icon dashboard-header__collapse"
                onClick={() => setCollapsed((value) => !value)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
                aria-controls="dashboard-navigation-desktop"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <PanelLeftOpen aria-hidden="true" /> : <PanelLeftClose aria-hidden="true" />}
              </button>
              <Dialog.Trigger asChild>
                <button type="button" className="dashboard-header__icon dashboard-header__menu" aria-label="Open sidebar"><Menu aria-hidden="true" /></button>
              </Dialog.Trigger>
              <div>
                <p className="dashboard-header__eyebrow">{isAdmin ? "Admin workspace" : "My workspace"}</p>
                <h1 className="dashboard-header__title">{pageTitle}</h1>
              </div>
            </div>

            <div className="dashboard-header__actions">
              <Link to="/" className="dashboard-header__website" aria-label="View website"><span>View website</span><ArrowUpRight aria-hidden="true" /></Link>
              <ThemeToggle className="dashboard-header__icon" />
              <span className="dashboard-header__role">{isAdmin ? <ShieldCheck aria-hidden="true" /> : <UserRound aria-hidden="true" />}<span>{isAdmin ? "Admin" : "Account"}</span></span>
            </div>
          </header>

          <main className="dashboard-content" id="dashboard-content" tabIndex={-1}>
            <div className="dashboard-content__inner"><Outlet /></div>
          </main>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="dashboard-drawer__overlay" />
          <Dialog.Content className="dashboard-drawer" aria-modal="true">
            <Dialog.Title className="sr-only">{isAdmin ? "Admin" : "Account"} navigation</Dialog.Title>
            <Dialog.Description className="sr-only">Choose a page from your workspace, return to the website or sign out.</Dialog.Description>
            <SideBar mobile onNavigate={() => setMobileOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
};

export default MainLayout;
