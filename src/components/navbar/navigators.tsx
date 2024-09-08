import { Bug, HomeIcon, PanelBottom, Share } from "lucide-react";

export const headerNavList = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Shares",
    path: "/shares",
  },
];

export const menuNavItems = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Shares",
    path: "/shares",
    icon: <Share />,
  },
  {
    label: "Debug issues",
    path: "/debugs",
    icon: <Bug />,
  },
  {
    label: "Admin",
    path: "/admin",
    icon: <PanelBottom />,
  },
];
