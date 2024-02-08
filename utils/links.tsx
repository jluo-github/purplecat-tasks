import { AreaChart, ClipboardList, ListPlus } from "lucide-react";

type NavLink = {
 href: string;
 label: string;
 icon: React.ReactNode;
};

const links: NavLink[] = [
 {
  href: "/add-task",
  label: "add task",
  icon: <ListPlus />,
 },

 {
  href: "/tasks",
  label: "all tasks",
  icon: <ClipboardList />,
 },

 {
  href: "/stats",
  label: "stats",
  icon: <AreaChart />,
 },
];

export default links;
