import React from "react";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import HeroRessource from "@/components/HeroRessource";
import RessourceContent from "@/components/RessourceContent";
import {buildSeoMetadata} from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {slug} = await params;
    const global = await getGlobal();
    const ressource = await getRessource(slug);
    const attributes = ressource[0]?.attributes;

    if (!attributes) return {};

    return buildSeoMetadata({
        metas: attributes.metas,
        global,
        path: `/ressources/${slug}`,
        fallbackTitle: attributes.title || "Ressource Herakles",
        fallbackDescription: attributes.shortDescription || "Ressource Herakles sur les solutions logicielles metier.",
        fallbackImage: attributes.featuredImage,
        type: "article",
        publishedTime: attributes.publishedAt,
        modifiedTime: attributes.updatedAt,
    });
};

const Ressource = async ({params}: Props) => {
    const {slug} = await params;
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["ressource", slug],
        queryFn: () => getRessource(slug),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroRessource/>
            <RessourceContent/>
        </HydrationBoundary>
    );
};

export default Ressource;
