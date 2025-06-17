import React from 'react';
import type {Metadata, ResolvingMetadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import HeroRessource from "@/components/HeroRessource";
import RessourceContent from "@/components/RessourceContent";

export const generateMetadata = async ({params}: { params: { slug: string } }): Promise<Metadata> => {
    const {BACK_URL, FRONT_URL} = process.env;
    const global = await getGlobal();
    const ressource = await getRessource(params.slug);
    const metas = ressource[0]?.attributes.metas

    return {
        metadataBase: new URL(FRONT_URL + "/" + params.slug),
        title: metas?.meta_title || ressource[0]?.attributes.title,
        description: metas?.meta_description || ressource[0]?.attributes.shortDescription,
        openGraph: {
            title: metas?.meta_title || ressource[0]?.attributes.title,
            siteName: metas?.meta_title || global?.siteName,
            description: metas?.meta_description || ressource[0]?.attributes.shortDescription,
            url: FRONT_URL + "/ressources/" + params.slug,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || BACK_URL + ressource[0]?.attributes.featuredImage?.data?.attributes?.formats?.thumbnail?.url || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/" + params.slug,
            title: metas?.meta_title || ressource[0]?.attributes.title,
            description: metas?.meta_description || ressource[0]?.attributes.shortDescription,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || BACK_URL + ressource[0]?.attributes.featuredImage?.data?.attributes?.formats?.thumbnail?.url  || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};


const Ressource = async ({params}: { params: { slug: string } }) => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["ressource", params.slug],
        queryFn: () => getRessource(params.slug),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroRessource/>
            <RessourceContent/>
        </HydrationBoundary>
    );
};

export default Ressource;