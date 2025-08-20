import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { NavItem } from "./constants/roles"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// helper function
export function getIsActive(pathname: string, item: NavItem): boolean {
  if (item.exact) {
    return pathname === item.url
  }
  return pathname.startsWith(item.url)
}


