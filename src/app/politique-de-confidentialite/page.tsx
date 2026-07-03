import React from "react";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";
import getPrivacyPolicy from "@/actions/getPrivicyPolicy";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const policy = await getPrivacyPolicy();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: policy.metas,
        global,
        path: "/politique-de-confidentialite",
        fallbackTitle: "Politique de confidentialite | Edilogic",
        fallbackDescription: "Politique de confidentialite du site Edilogic.",
        robots: {
            index: false,
            follow: true,
        },
    });
};

const PolitiqueDeConfidentialite = async () => {
    const policy = await getPrivacyPolicy();

    return (
        <>
            <Breadcrumbs items={[{label: "Politique de confidentialite", href: "/politique-de-confidentialite"}]}/>
            <div className="py-8 md:py-12">
                <RichText content={policy.content}/>
            </div>
        </>
    );
};

export default PolitiqueDeConfidentialite;
