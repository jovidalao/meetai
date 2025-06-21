import { HomeView } from "@/modules/home/ui/views/home-view"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";

const Page = async () => {

  const session = await auth.api.getSession(
    { headers: await headers(), }
  );
  if (!session) {
    redirect("/sign-in")
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HomeView />
  )
}

export default Page