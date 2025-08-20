import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Form, Link } from "react-router"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    // "GET"  mengarah ke loader || "Post" mengarah ke action
    <Form method="GET" action="/auth/google" className={cn("flex flex-col gap-6", className)} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login ke Akun Anda</h1>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your gmail below to login to your account
        </p> */}
        <p className="text-muted-foreground text-sm">
          Dengan login, Anda mengizinkan kami menggunakan email dan nama lengkap Anda untuk keperluan layanan
        </p>
      </div>
      <div className="grid gap-6">

        <Button variant="outline" className="w-full cursor-pointer" type="submit">
          <img
            src="/icons-google.svg"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Login with Gmail
        </Button>
      </div>

    </Form>
  )
}
