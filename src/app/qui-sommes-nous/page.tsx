import React from "react";
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
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const about = await getAbout();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: about.metas,
        global,
        path: "/qui-sommes-nous",
        fallbackTitle: "Qui sommes-nous | Edilogic",
        fallbackDescription: "Decouvrez Edilogic, editeur de solutions logicielles metier.",
    });
};

const About = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["about"],
        queryFn: () => getAbout(),
    })

    return (
        <>
            <Breadcrumbs items={[{label: "Qui sommes-nous", href: "/qui-sommes-nous"}]}/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <HeroAbout/>
                <Expertises/>
                <Story/>
                <TestimonialsAbout/>
                <StepAbout/>
                <CtaAbout/>
                <CallToActionNewsletter/>
            </HydrationBoundary>
        </>
    );
};

export default About;
