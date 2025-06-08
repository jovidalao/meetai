import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client"
import { ChevronUpIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    });
  }

  if (isPending || !data?.user) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-lg border-border/10 p-3 w-full flex items-center justify-between bg-white/10 overflow-hidden gap-2"
      >
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
            <AvatarFallback>
              {data.user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ) : (<GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3" />)}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm w-full truncate">
            {data.user.name}
          </p>
          <p className="text-xs text-muted-foreground w-full truncate">
            {data.user.email}
          </p>
        </div>
        <ChevronUpIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-59">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-xs text-muted-foreground truncate">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between" onClick={onLogout}>
          Logout
          <LogOutIcon className="size-4 ml-auto" />
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}