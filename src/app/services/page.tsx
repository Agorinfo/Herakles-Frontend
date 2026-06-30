import React from 'react';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import getSolution from "@/actions/getSolutions";
import getHome from "@/actions/getHome";
import getServices from "@/actions/getServices";
import Strengths from "@/sections/Strengths";
import {CallToActionNewsletter} from "@/components/CallToAction";
import SolutionList from "@/sections/SolutionList";
import ReassuranceArchiveService from "@/sections/ReassuranceArchiveService";
import HeroArchiveServices from "@/sections/HeroArchiveServices";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async (): Promise<Metadata> => {
    const global = await getGlobal();
    const metas = global.archiveServices.metas

    return buildSeoMetadata({
        metas,
        global,
        path: "/services",
        fallbackTitle: "Services | Herakles",
        fallbackDescription: "Services Herakles pour integrer, deployer et faire evoluer vos solutions logicielles metier.",
    });
};

const Services = async () => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["solutions"],
        queryFn: () => getSolution(),
    });
    await queryClient.prefetchQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });
    await queryClient.prefetchQuery({
        queryKey: ["services"],
        queryFn: () => getServices(),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeroArchiveServices />
            <Strengths />
            <CallToActionNewsletter />
            <div className="">
                <SolutionList />
            </div>
            <ReassuranceArchiveService />
        </HydrationBoundary>
    );
};

export default Services;
