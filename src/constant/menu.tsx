import { ReactNode } from 'react';
import { GrTransaction } from "react-icons/gr";

interface SubMenu {
  id: number;
  name: string;
  src: ReactNode; 
  href: string;
  gap: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  src: ReactNode; 
  href: string;
  gap?: boolean;
  subMenu?: SubMenu[]; // Making 'subMenu' property optional
}

export const menu: MenuItem[] = [
  { id: 1, name: "Transaction", src: <GrTransaction />, href: "/" },
];