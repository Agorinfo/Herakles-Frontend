import React from "react";
import Loader from "@/components/Loader";
import HeroService from "@/components/HeroService";
import {CallToActionImage, CallToActionNewsletter} from "@/components/CallToAction";
import TestimonialsPage from "@/sections/TestimonialsPage";
import getService from "@/actions/getService";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

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
        fallbackTitle: `${attributes.name || "Service"} | Edilogic`,
        fallbackDescription: attributes.shortDescription || "Service Edilogic pour vos solutions logicielles metier.",
    });
};

const Service = async ({params}: Props) => {
    const {slug} = await params;
    const data = await getService(slug);
    const attributes = data?.[0]?.attributes;

    if (!attributes) return <Loader/>;

    return (
        <>
            <Breadcrumbs
                items={[
                    {label: "Services", href: "/services"},
                    {label: attributes.name || attributes.hero.title || "Service", href: `/services/${slug}`},
                ]}
            />
            <HeroService
                title={attributes.hero.title}
                icon={attributes.hero.icon}
                teaser={attributes.hero.teaser}
                steps={attributes.step}
                heroImg={attributes.hero.images.data}
                stepImg={attributes.stepImg}
                logo={attributes.hero.logo}
            />
            {attributes.cta && <CallToActionImage
                document={attributes.cta.document?.data?.attributes.url}
                title={attributes.cta.title}
                text={attributes.cta.text}
                image={attributes.cta.image}
                color={attributes.cta.background}
                position={attributes.cta.position}
                label={attributes.cta.label}
                url={attributes.cta.url}
            />}
            {attributes.testimonial.length > 0 &&
                <TestimonialsPage testimonials={attributes.testimonial}/>}
            <CallToActionNewsletter/>
        </>
    );
};

export default Service;
