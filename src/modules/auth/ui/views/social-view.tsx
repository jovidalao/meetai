import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { FaGithub, FaGoogle } from "react-icons/fa"

interface AuthSocialViewProps {
    pending: boolean;
}

export const AuthSocialView = ({ pending }: AuthSocialViewProps) => {
    return (
        <div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
            </div>
            <div className="pt-4 grid grid-cols-2 gap-4">
                <Button
                    onClick={() => authClient.signIn.social({
                        provider: "google"
                    })}
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                >
                    <FaGoogle className="mr-1" />
                    Google
                </Button>
                <Button
                    onClick={() => authClient.signIn.social({ provider: "github", })}
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                >
                    <FaGithub className="mr-1" />
                    Github
                </Button>
            </div>
        </div>
    )
}