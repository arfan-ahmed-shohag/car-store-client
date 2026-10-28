import { matchPath } from "react-router";
import { CarFront, LayoutDashboard, Plus, ShieldPlus, ShoppingBag, Star, UserRound, Users, type LucideIcon } from "lucide-react";
import { AdminPath } from "../routers/admin.router";
import { userRouterPath } from "../routers/user.router";

interface DashboardNavigationItem {
  name: string;
  path: string;
  Icon: LucideIcon;
}

interface DashboardNavigationGroup {
  title: string;
  items: DashboardNavigationItem[];
}

const icons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  "get-all-products": CarFront,
  "all-orders": ShoppingBag,
  "get-all-user": Users,
  "create-product": Plus,
  "create-admin": ShieldPlus,
  profile: UserRound,
  order: ShoppingBag,
  review: Star,
};

export function getDashboardNavigation(role: string | undefined): DashboardNavigationGroup[] {
  const routes = role === "admin" ? AdminPath : role === "user" ? userRouterPath : [];
  const groups = role === "admin"
    ? [
        { title: "Overview", paths: ["dashboard"] },
        { title: "Management", paths: ["get-all-products", "all-orders", "get-all-user"] },
        { title: "Create", paths: ["create-product", "create-admin"] },
        { title: "Account", paths: ["profile"] },
      ]
    : [
        { title: "Workspace", paths: ["dashboard", "order", "review"] },
        { title: "Account", paths: ["profile"] },
      ];

  return groups.map(({ title, paths }) => ({
    title,
    items: paths.flatMap((path) => {
      const route = routes.find((item) => item.path === path);
      return route ? [{ name: route.name, path, Icon: icons[path] ?? LayoutDashboard }] : [];
    }),
  })).filter((group) => group.items.length > 0);
}

export function getDashboardTitle(role: string | undefined, pathname: string): string {
  const routes = role === "admin" ? AdminPath : role === "user" ? userRouterPath : [];
  return routes.find((route) => matchPath({ path: `/${role}/${route.path}`, end: true }, pathname))?.name ?? "Dashboard";
}
