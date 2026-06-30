import React from 'react';
import Image from "next/image";
import FeatureReleased from "@/components/FeatureReleased";
import emptyImg from "@/assets/empty-img.png"

interface FeatureReleasedProps {
    data: {
        id: number;
        version: string;
        details: {
            title: string;
            description: string;
        }[];
    }[],
    image: {
        data: {
            attributes: {
                url: string;
                alternativeText: string;
            }
        }
    };
    colors: {
        base: string;
        hover: string;
        accent: string;
        muted: string;
    }
}

const FeaturesReleased = ({data, image, colors}: FeatureReleasedProps) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    return (
        <>
            {data && image ?
                <div className="grid lg:grid-cols-2 gap-[9.688vw] py-12">
                    {data.map((item, index) => (
                        <FeatureReleased colors={colors} key={item.id} data={item} index={index}/>
                    ))}
                    {image.data ?
                        <Image
                            src={image.data ? backUrl + image.data.attributes.url : emptyImg.src}
                            alt={image.data ? image.data.attributes.alternativeText : ""}
                            width={640}
                            height={480}
                            className="w-full h-auto"
                        />
                        : null
                    }
                </div>
                : null
            }
        </>
    );
};

export default FeaturesReleased;
