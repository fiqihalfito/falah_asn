import { Link } from "react-router";
import { Button } from "./ui/button";

export function LogoutButton() {
    return (
        <Button asChild>
            <Link to={`/auth/logout`}>
                Logout
            </Link>
        </Button>
    )
}