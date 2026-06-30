import React from "react";
import type {Metadata} from "next";
import getLegalNotices from "@/actions/getLegalNotices";
import getGlobal from "@/actions/getGlobal";
import RichText from "@/components/RichText";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async (): Promise<Metadata> => {
    const legal = await getLegalNotices();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: legal.metas,
        global,
        path: "/mentions-legales",
        fallbackTitle: "Mentions legales | Herakles",
        fallbackDescription: "Mentions legales du site Herakles.",
        robots: {
            index: false,
            follow: true,
        },
    });
};

const MentionsLegales = async () => {
    const legal = await getLegalNotices();

    return (
        <div className="py-8 md:py-12">
            <RichText content={legal.content}/>
        </div>
    );
};

export default MentionsLegales;
