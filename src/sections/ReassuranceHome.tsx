"use client"
import React from 'react';
import Button from "@/components/Button";
import {ReassuranceType} from "@/utils/types";
import {SliderLandscape} from "@/components/Slider";
import CallToAction from "@/components/CallToAction";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import Content from "@/components/Content";
import getGlobal from "@/actions/getGlobal";
import Reassurance from "@/components/Reassurance";
import emptyImg from "@/assets/empty-img.png"

const ReassuranceHome = () => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const {data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: getHome,
    });
    const global = useQuery({
        queryKey: ["global"],
        queryFn: getGlobal,
    });

    if (isLoading) return <Loader/>

    if (error) return <p>{error.message}</p>
    return (
        <Reassurance
            icon={global.data.favicon.data ? global.data.favicon.data.attributes.url : emptyImg.src}
            alt={global.data.favicon.data ? global.data.favicon.data.attributes.alternativeText : ""}
            text={data?.reassurance.text}
            images={data?.reassurance.images}
            label={data?.reassurance.label}
            url={data?.reassurance.url}
            ctaTitle={data?.reassurance.callToAction.title}
            ctaText={data?.reassurance.callToAction.text}
            ctaButtonLabel={data?.reassurance.callToAction.labelButton}
            ctaHeadingClassName="text-accent"
            ctaButtonClassName="btn-accent"
        />
    );
};

export default ReassuranceHome;