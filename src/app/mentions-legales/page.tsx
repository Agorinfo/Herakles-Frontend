import React from "react";
import type {Metadata} from "next";
import getLegalNotices from "@/actions/getLegalNotices";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";
import {buildSeoMetadata} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const generateMetadata = async (): Promise<Metadata> => {
    const legal = await getLegalNotices();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: legal.metas,
        global,
        path: "/mentions-legales",
        fallbackTitle: "Mentions legales | Edilogic",
        fallbackDescription: "Mentions legales du site Edilogic.",
        robots: {
            index: false,
            follow: true,
        },
    });
};

const MentionsLegales = async () => {
    const legal = await getLegalNotices();

    return (
        <>
            <Breadcrumbs items={[{label: "Mentions legales", href: "/mentions-legales"}]}/>
            <div className="py-8 md:py-12">
                <RichText content={legal.content}/>
            </div>
        </>
    );
};

export default MentionsLegales;
