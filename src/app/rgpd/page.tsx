import React from "react";
import type {Metadata} from "next";
import getGlobal from "@/actions/getGlobal";
import getRgpd from "@/actions/getRgpd";
import RichText from "@/components/RichText";
import {buildSeoMetadata} from "@/lib/seo";

export const generateMetadata = async (): Promise<Metadata> => {
    const rgpd = await getRgpd();
    const global = await getGlobal();

    return buildSeoMetadata({
        metas: rgpd.metas,
        global,
        path: "/rgpd",
        fallbackTitle: "RGPD | Herakles",
        fallbackDescription: "Informations RGPD du site Herakles.",
        robots: {
            index: false,
            follow: true,
        },
    });
};

const Rgpd = async () => {
    const rgpd = await getRgpd();

    return (
        <div className="py-8 md:py-12 text-sm">
            <RichText content={rgpd.content}/>
            <div className="border">
                <div className="hidden md:flex divide-x md:justify-between md:items-center md:py-2 md:border-b">
                    <span className="inline-block pl-4 font-semibold">
                        Type de Donnees
                    </span>
                    <div className="divide-x">
                        <span className="inline-block w-[170px] text-center font-semibold">Donnees des salaries</span>
                        <span className="inline-block w-[170px] text-center font-semibold">Donnees des tiers</span>
                    </div>
                </div>

                {rgpd.tableData.map((item: any) => (
                    <div className="border-b" key={item.id}>
                        <div className="divide-x flex flex-col md:flex-row justify-between md:items-center py-2">
                            <span className="inline-block pl-4">{item.type}</span>
                            <div className="divide-x flex items-center justify-center md:justify-normal">
                                <span className="inline-block w-[170px] text-center">
                                    <span className="md:hidden text-sm">Employes : </span>{item.employeeData ? "Oui" : "Non"}
                                </span>
                                <span className="inline-block w-[170px] text-center">
                                    <span className="md:hidden text-sm">Tiers : </span>{item.thirdPartyData ? "Oui" : "Non"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rgpd;
