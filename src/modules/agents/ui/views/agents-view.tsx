"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  // if (isLoading) return <LoadingState title="Loading..." description="Loading agents..." />;
  // if (isError) return <ErrorState title="Error" description="Failed to load agents" />;

  return (
    <div>
      <ResponsiveDialog title="Agents" description="Agents" open={true} onOpenChange={() => {}}>
        test
        <Button>
          Some Action
        </Button>
      </ResponsiveDialog>
      {JSON.stringify(data, null, 2)}
    </div>
  )
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState title="Loading..." description="Loading agents..." />
  )
}

export const AgentsViewError = () => {
  return (
    <ErrorState title="Error" description="Failed to load agents" />
  )
}