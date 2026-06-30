import HeroHome from "@/sections/HeroHome";
import SolutionsUsers from "@/sections/SolutionsUsers";
import Testimonials from "@/sections/Testimonials";
import Solution from "@/sections/Solutions";
import ReassuranceHome from "@/sections/ReassuranceHome";
import Strengths from "@/sections/Strengths";
import Support from "@/sections/Support";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import CtaHome from "@/sections/CtaHome";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async (): Promise<Metadata> => {
    const home = await getHome();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: home.metas,
        global,
        path: "/",
        fallbackTitle: "Herakles, editeur de solutions logicielles metier",
        fallbackDescription: "Solutions logicielles de gestion pour accompagner les entreprises dans leurs operations metier.",
    });
};

export default async function Home() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <HeroHome/>
                <SolutionsUsers/>
                <Testimonials/>
                <Solution/>
                <ReassuranceHome/>
                <Strengths/>
                <Support/>
                <CtaHome/>
            </HydrationBoundary>
        </>
    );
}
