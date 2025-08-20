import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/landing-page.tsx"),

    ...prefix("auth", [
        route("login", "routes/auth/login.tsx"),
        route("google", "routes/auth/google.tsx"),
        route("google/callback", "routes/auth/google-callback.tsx"),
        route("logout", "routes/auth/logout.tsx"),
    ]),

    route("app", "routes/app/index.tsx", [


        layout("components/layout/sidebar-headbar.tsx", [
            // peserta 
            ...prefix("peserta", [
                index("routes/app/peserta/dashboard/index.tsx"),
                ...prefix("mulai-ujian", [
                    index("routes/app/peserta/mulai-ujian/index.tsx"),
                    ...prefix(":eventId", [
                        route("rule", "routes/app/peserta/mulai-ujian/rule-page/index.tsx"),
                        route("init", "routes/app/peserta/ujian/init.tsx")
                    ])
                ]),
                ...prefix("hasil-ujian", [
                    index("routes/app/peserta/hasil-ujian/index.tsx"),
                    route(":eventId", "routes/app/peserta/hasil-ujian/show.tsx")
                ]),

                ...prefix("nilai-kami", [
                    index("routes/app/peserta/nilai-kami/index.tsx")
                ]),

                route("test-loader", "routes/app/peserta/tes-loader.tsx"),

                // ...prefix("ujian", [
                //     route("init", "routes/app/peserta/ujian/init.tsx")
                // ])
            ])
        ]),

        ...prefix("ujian", [
            // index("routes/app/peserta/ujian/index.tsx"),

            // submit ujian here
            route("submit/:sesiUjianId", "routes/app/peserta/ujian/submit.tsx"),
            // ujian finish
            route("selesai/:sesiUjianId", "routes/app/peserta/ujian/selesai.tsx"),

            // event start here
            route("sesi/:sesiUjianId", "routes/app/peserta/ujian/$sesiUjianId.tsx", [
                route("soal/:indexSoalSet", "routes/app/peserta/ujian/soal/$indexSoalSet.tsx"),
            ]),

        ])

    ]),

    // route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
