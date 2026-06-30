import React from "react";
import Loader from "@/components/Loader";
import HeroService from "@/components/HeroService";
import {CallToActionImage, CallToActionNewsletter} from "@/components/CallToAction";
import TestimonialsPage from "@/sections/TestimonialsPage";
import getService from "@/actions/getService";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {buildSeoMetadata} from "@/lib/seo";

type Props = {
    params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {slug} = await params;
    const global = await getGlobal();
    const service = await getService(slug);
    const attributes = service[0]?.attributes;

    if (!attributes) return {};

    return buildSeoMetadata({
        metas: attributes.metas,
        global,
        path: `/services/${slug}`,
        fallbackTitle: `${attributes.name || "Service"} | Herakles`,
        fallbackDescription: attributes.shortDescription || "Service Herakles pour vos solutions logicielles metier.",
    });
};

const Service = async ({params}: Props) => {
    const {slug} = await params;
    const data = await getService(slug);

    if (!data) return <Loader/>;

    return (
        <>
            <HeroService
                title={data[0].attributes.hero.title}
                icon={data[0].attributes.hero.icon}
                teaser={data[0].attributes.hero.teaser}
                steps={data[0].attributes.step}
                heroImg={data[0].attributes.hero.images.data}
                stepImg={data[0].attributes.stepImg}
                logo={data[0].attributes.hero.logo}
            />
            {data[0].attributes.cta && <CallToActionImage
                document={data[0].attributes.cta.document?.data?.attributes.url}
                title={data[0].attributes.cta.title}
                text={data[0].attributes.cta.text}
                image={data[0].attributes.cta.image}
                color={data[0].attributes.cta.background}
                position={data[0].attributes.cta.position}
                label={data[0].attributes.cta.label}
                url={data[0].attributes.cta.url}
            />}
            {data[0].attributes.testimonial.length > 0 &&
                <TestimonialsPage testimonials={data[0].attributes.testimonial}/>}
            <CallToActionNewsletter/>
        </>
    );
};

export default Service;
