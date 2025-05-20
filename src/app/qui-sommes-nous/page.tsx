import React from 'react';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getAbout from "@/actions/getAbout";
import HeroAbout from "@/sections/HeroAbout";
import Expertises from "@/sections/Expertises";
import Story from "@/sections/Story";
import TestimonialsAbout from "@/sections/TestimonialsAbout";
import {CallToActionNewsletter} from "@/components/CallToAction";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import CtaAbout from "@/sections/CtaAbout";
import StepAbout from "@/sections/StepAbout";

export const generateMetadata = async (): Promise<Metadata> => {
    const {BACK_URL,FRONT_URL} = process.env;
    const about = await getAbout();
    const global = await getGlobal();
    const metas = about.metas

    return {
        metadataBase: new URL(FRONT_URL + "/qui-sommes-nous"),
        title: metas.meta_title || "Edilogic, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Edilogic",
        openGraph: {
            title: metas?.meta_title || "Edilogic, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Edilogic, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Edilogic",
            url: FRONT_URL + "/qui-sommes-nous",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/qui-sommes-nous",
            title: metas?.meta_title || "Edilogic, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Edilogic",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};

const About = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroAbout />
            <Expertises />
            <Story />
            <TestimonialsAbout />
            <StepAbout />
            <CtaAbout />
            <CallToActionNewsletter />
        </HydrationBoundary>
    );
};

export default About;