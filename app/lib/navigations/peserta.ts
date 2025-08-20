import type { DataNavItem } from "../constants/roles";

export const data: DataNavItem = {
    navMain: [
        {
            title: "Peserta",
            url: "#",
            items: [
                {
                    title: "Dashboard",
                    url: "/app/peserta",
                    exact: true
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
                    url: "/app/peserta/mulai-ujian",
                    // exact: true
                },
                {
                    title: "Hasil Ujian",
                    url: "/app/peserta/hasil-ujian",
                    // exact: true,
                },
                {
                    title: "Nilai Kami",
                    url: "/app/peserta/nilai-kami",
                    // exact: true,
                },
                // {
                //     title: "Data Fetching",
                //     url: "/app/peserta/test-loader",
                //     isActive: true,
                // },

            ],
        },

    ],
}