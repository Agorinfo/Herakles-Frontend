import React from 'react';
import Loader from "@/components/Loader";
import HeroService from "@/components/HeroService";
import {CallToActionImage, CallToActionNewsletter} from "@/components/CallToAction";
import TestimonialsPage from "@/sections/TestimonialsPage";
import getService from "@/actions/getService";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";

type Props = {
    params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {slug} = await params;
    const {BACK_URL, FRONT_URL} = process.env;
    const global = await getGlobal();
    const service = await getService(slug);
    const metas = service[0].attributes.metas

    return {
        metadataBase: new URL(FRONT_URL + "/" + slug),
        title: metas.meta_title || "Edilogic, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : Edilogic",
        openGraph: {
            title: metas?.meta_title || "Edilogic, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "Edilogic, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : Edilogic",
            url: FRONT_URL + "/" + slug,
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL + "/" + slug,
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

const Service = async ({params}: Props) => {
    const {slug} = await params;
    const data = await getService(slug);

    if(!data) return <Loader />;

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
            {data[0].attributes.testimonial.length > 0 && <TestimonialsPage testimonials={data[0].attributes.testimonial}/>}
            <CallToActionNewsletter />
        </>
    );
};

export default Service;