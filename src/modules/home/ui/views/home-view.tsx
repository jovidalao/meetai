"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.hello.queryOptions({text: "Hello"}));

    console.log(data);

    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p>{data?.greeting}</p>
        </div>
    )
}