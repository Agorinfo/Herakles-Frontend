import React from 'react';
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
                        <img
                            src={image.data ? backUrl + image.data.attributes.url : emptyImg.src}
                            alt={image.data ? image.data.attributes.alternativeText : ""}
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