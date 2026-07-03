import React from 'react';
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import HeroRessources from "@/components/HeroRessources";
import RessourceGridItems from "@/components/RessourceGridItems";
import getCategories from "@/actions/getCategories";
import getFaq from "@/actions/getFaq";
import SectionFaq from "@/components/SectionFaq";
import getAllRessources from "@/actions/getAllRessources";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const global = await getGlobal();
    const metas = global.archiveRessources?.metas

    return buildSeoMetadata({
        metas,
        global,
        path: "/ressources",
        fallbackTitle: "Ressources | Edilogic",
        fallbackDescription: "Articles, guides et ressources pour mieux piloter vos solutions logicielles metier.",
    });
};

const Ressources = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["global"],
        queryFn: () => getGlobal(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["ressources"],
        queryFn: () => getAllRessources(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["faq"],
        queryFn: () => getFaq(),
    })

    return (
        <>
            <Breadcrumbs items={[{label: "Ressources", href: "/ressources"}]}/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <HeroRessources/>
                <RessourceGridItems/>
                <SectionFaq />
            </HydrationBoundary>
        </>
    );
};

export default Ressources;
