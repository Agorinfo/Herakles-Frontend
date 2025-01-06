import React from 'react';
import type {Metadata} from "next";
import getLegalNotices from "@/actions/getLegalNotices";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";

export const generateMetadata = async (): Promise<Metadata> => {
    const legal = await getLegalNotices();
    const global = await getGlobal();
    const metas = await legal.metas;
    const {BACK_URL, FRONT_URL} = process.env;

    return {
        metadataBase: new URL(FRONT_URL! + "/mentions-legales"),
        title: metas.meta_title || "We Négoce, éditeur de solution logicielles métier",
        description: metas?.meta_description || "Solutions logicielles de gestion : We Négoce",
        openGraph: {
            title: metas?.meta_title || "We Négoce, éditeur de solution logicielles métier",
            siteName: metas?.meta_title || "We Négoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : We Négoce",
            url: FRONT_URL! + "/mentions-legales",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        twitter: {
            card: 'summary_large_image',
            site: FRONT_URL! + "/mentions-legales",
            title: metas?.meta_title || "We Négoce, éditeur de solution logicielles métier",
            description: metas?.meta_description || "Solutions logicielles de gestion : We Négoce",
            images: [`${BACK_URL}${metas?.shareImage?.data?.attributes.url}` || ""],
        },
        icons: {
            icon: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            apple: `${BACK_URL}${global?.favicon.data.attributes.url}`,
            shortcut: `${BACK_URL}${global?.favicon.data.attributes.url}`
        }
    }
};

const MentionsLegales = async () => {
    const legal = await getLegalNotices();
    return (
        <>
            <head>
                <meta name="robots" content="noindex, follow"/>
            </head>
            <div className="py-8 md:py-12">
            <RichText content={legal.content} />
        </div>
        </>
    );
};

export default MentionsLegales;