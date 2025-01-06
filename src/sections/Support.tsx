"use client"
import React from 'react';
import Curve from "@/components/Curve";
import Content from "@/components/Content";
import {SupportType} from "@/utils/types";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import emptyImg from "@/assets/empty-img.png"

const Support = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: getHome,
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <>
            <Curve/>
            <section className="full-width bg-map pb-12">
                <div className="grid md:grid-cols-2 gap-[5.729vw] xl:gap-[3.5vw]">
                    <img
                        className="w-full h-full object-contain"
                        src={data?.support.image.data ? backUrl + data?.support.image.data.attributes.url : emptyImg.src}
                        alt={data?.support.image.data ? data?.support.image.data.attributes.alternativeText : ""}
                    />
                    <Content
                        teaser={data.support.content.teaser}
                        content={data.support.content.content}
                        label1={data.support.content.label1}
                        label2={data.support.content.label2}
                        url1={data.support.content.url1}
                        url2={data.support.content.url2}
                        headingClassName="[&>em]:text-featured [&>em]:not-italic"
                    />
                </div>
            </section>
        </>
    );
};

export default Support;