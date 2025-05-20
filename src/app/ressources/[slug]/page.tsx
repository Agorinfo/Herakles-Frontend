import React from 'react';
import type {Metadata, ResolvingMetadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getRessource from "@/actions/getRessource";
import HeroRessource from "@/components/HeroRessource";
import RessourceContent from "@/components/RessourceContent";

type Props = {
    params: { slug: string };
};


export const generateMetadata = async ({params}: Props) : Promise<Metadata> => {
    const {slug} = params;
    const {BACK_URL, FRONT_URL} = process.env;
    const global = await getGlobal();
    const ressource = await getRessource(slug);
    const metas = ressource[0]?.attributes.metas

    return {
        metadataBase: new URL(FRONT_URL + "/" + slug),
        title: metas?.meta_title || ressource[0]?.attributes.title,
        description: metas?.meta_description || ressource[0]?.attributes.shortDescription,
        openGraph: {
            title: metas?.meta_title || ressource[0]?.attributes.title,
            siteName: metas?.meta_title || global?.siteName,
            description: metas?.meta_description || ressource[0]?.attributes.shortDescription,
            url: FRONT_URL + "/ressources/" + slug,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || BACK_URL + ressource[0]?.attributes.featuredImage?.data?.attributes?.formats?.thumbnail?.url || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/" + slug,
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


const Ressource = async ({params}: Props) => {
    const {slug} = params;
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