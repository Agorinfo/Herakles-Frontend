import React from "react";
import {notFound} from "next/navigation";
import HeroPage from "@/components/HeroPage";
import {createColorPalette} from "@/lib/createColorPalette";
import {CallToActionNewsletter, CallToActionPage} from "@/components/CallToAction";
import SolutionFeatures from "@/sections/SolutionFeatures";
import FeaturesReleased from "@/sections/FeaturesReleased";
import ReassuranceSolution from "@/sections/ReassuranceSolution";
import RelatedServices from "@/sections/RelatedServices";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import getSolution from "@/actions/getSolution";
import emptyImg from "@/assets/empty-img.png"
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
    params: Promise<{ slug: string }>;
};

async function getData(slug: string) {
    const {API_URL, API_KEY} = process.env
    const res = await fetch(`${API_URL}/solutions?populate=brandImg,%20heroArchive.logo,%20heroArchive.informationCard.image,%20heroArchive.background,heroArchive.moduleList,%20reassurance.card,%20HeroPage.images,%20HeroPage.logo,%20HeroPage.content,%20cta,%20FeaturesReleased.details,%20featuresReleasedImg,%20newsletter,features,modules.features.activities,modules.features.details,%20modules.features.activities,%20solutionComp&filters%5Bslug%5D%5B%24eq%5D=${slug}`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })

    if (!res.ok) {
        return notFound()
    }

    return res.json().then(res => res.data);
}

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {slug} = await params;
    const solution = await getSolution(slug)
    const global = await getGlobal();
    const attributes = solution[0]?.attributes;

    if (!attributes) return {};

    return buildSeoMetadata({
        metas: attributes.metas,
        global,
        path: `/solutions/${slug}`,
        fallbackTitle: `${attributes.name || "Solution"} | Edilogic`,
        fallbackDescription: attributes.shortDescription || "Solution logicielle metier Edilogic.",
    });
};

const Solution = async ({params}: Props) => {
    const {slug} = await params;
    const data = await getData(slug);
    const attributes = data[0].attributes;
    const colors = createColorPalette(attributes.brandColor);

    return (
        <>
            <Breadcrumbs
                items={[
                    {label: "Solutions", href: "/solutions"},
                    {label: attributes.name || "Solution", href: `/solutions/${slug}`},
                ]}
            />
            <HeroPage
                images={attributes.HeroPage.images}
                teaser={attributes.HeroPage.content.teaser}
                content={attributes.HeroPage.content.content}
                label1={attributes.HeroPage.content.label1}
                url1={attributes.HeroPage.content.url1}
                label2={attributes.HeroPage.content.label2}
                url2={attributes.HeroPage.content.url2}
                background={attributes.brandImg.data ? attributes.brandImg.data?.attributes : emptyImg.src}
                colors={colors}
            />
            <CallToActionPage
                title={attributes.cta.title}
                text={attributes.cta.text}
                buttonClassName="text-white outline-none ring-accent-muted focus-visible:ring"
                colors={colors}
            />
            <SolutionFeatures
                icon={attributes.icon}
                title={attributes.featureTitle}
                teaser={attributes.featureTeaser}
                dataModules={attributes.modules.data}
                colors={colors}
            />
            <FeaturesReleased
                data={attributes.FeaturesReleased}
                image={attributes.featuresReleasedImg}
                colors={colors}
            />
            <ReassuranceSolution data={attributes.reassurance} colors={colors}/>
            {attributes.solutionComp.length ?
                <RelatedServices
                    title="En complement"
                    solutions={attributes.solutionComp.map((solution: any) => solution.solution)}/>
                :
                null
            }
            <CallToActionNewsletter/>
        </>
    );
};

export default Solution;
