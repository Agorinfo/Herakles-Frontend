"use client"
import React from 'react';
import Slider from "@/components/Slider";
import Content from "@/components/Content";
import {useQuery} from "@tanstack/react-query";
import getHome from "@/actions/getHome";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";

const HeroHome = () => {
    const{data, error, isLoading} = useQuery({
        queryKey: ["home"],
        queryFn: () => getHome(),
    });


    if(isLoading) return  <Loader />

    if(error) return <p>{error.message}</p>

    return (
        <Hero
            background={"bg-accent-shine"}
            images={data?.hero.images}
            teaser={data?.hero.content?.teaser}
            content={data?.hero.content?.content}
            label1={data?.hero.content?.label1}
            url1={data?.hero.content?.url1}
            label2={data?.hero.content?.label2}
            url2={data?.hero.content?.url2}
        />
    );
};

export default HeroHome;