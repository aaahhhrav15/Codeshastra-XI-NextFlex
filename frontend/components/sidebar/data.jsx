import { MapPinned, CalendarCheck2, ClipboardList, Users, Wallet, Star, LayoutDashboard } from "lucide-react";

export const Menus = [
  { name: "Trip Summary", href: "/dashboard/summary", logo: LayoutDashboard },
  { name: "Itinerary", href: "/dashboard/itinerary", logo: CalendarCheck2 },
  { name: "Map View", href: "/dashboard/map", logo: MapPinned },
  { name: "Group Planner", href: "/dashboard/group", logo: Users },
  { name: "Budget Breakdown", href: "/dashboard/budget", logo: Wallet },
  { name: "Ratings & Feedback", href: "/dashboard/feedback", logo: Star },
];
