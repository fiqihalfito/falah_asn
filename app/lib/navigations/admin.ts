import type { DataNavItem } from "../constants/roles";

export const data: DataNavItem = {
    navMain: [
        {
            title: "Admin",
            url: "#",
            items: [
                {
                    title: "Dashboard",
                    url: "#",
                },
                // {
                //   title: "Project Structure",
                //   url: "#",
                // },
            ],
        },
        {
            title: "Ujian",
            url: "#",
            items: [
                {
                    title: "Mulai Ujian",
                    url: "#",
                },
                {
                    title: "Data Fetching",
                    url: "#",
                    exact: true,
                },

            ],
        },

    ],
}