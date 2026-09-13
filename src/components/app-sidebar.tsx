"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Flower,
  ShoppingCartMinus,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "Bloomora admin",
    email: "admin@bloomora.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Bloomora Team",
      logo: <GalleryVerticalEndIcon />,
      plan: "Florist Owner",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Inventory",
      url: "#",
      icon: <Flower />,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "/dashboard/products",
        },
        {
          title: "Unactive Products",
          url: "#",
        },
        {
          title: "Upcomping Products",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: <ShoppingCartMinus />,
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Pending Orders",
          url: "#",
        },
        {
          title: "Completed Orders",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
