
import type { Route } from "./+types/landing-page";
import { Landing } from "~/components/landing";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request, context }: Route.ActionArgs) {

}

export async function loader({ context }: Route.LoaderArgs) {
}

export default function LandingPage({ actionData, loaderData }: Route.ComponentProps) {

  const heading = "Falah ASN";
  const description = "platform simulasi tes CPNS yang dirancang khusus untuk kamu yang serius ingin lolos seleksi dan meraih masa depan sebagai Aparatur Sipil Negara.";
  const loginUrl = {
    text: "Silahkan Login",
    url: "/auth/login",
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Landing heading={heading} description={description} button={loginUrl} />
    </div>
  );
}
