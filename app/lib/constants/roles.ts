export const ROLES = {
    PESERTA: "peserta",
    ADMIN: "admin",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export type NavItem = {
    title: string
    url: string
    exact?: boolean
    items?: NavItem[]
}

export type DataNavItem = {
    navMain: NavItem[]
}