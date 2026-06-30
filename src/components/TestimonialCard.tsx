import React from 'react';
import Image from "next/image";
import {TestimonialType} from "@/utils/types";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import emptyImg from "@/assets/empty-img.png"

const TestimonialCard = ({
                             logo,
                             alt,
                             testimonial,
                             firstname,
                             name,
                             company,
                             job,
                             avatar,
                             avatarAlt
                         }: TestimonialType) => {
    return (
        <div className="py-12">
            <Image className="mx-auto max-w-32" src={logo ? logo : emptyImg.src} alt={alt} width={128} height={64}/>
            {testimonial &&
                <BlocksRenderer
                    content={testimonial}
                    blocks={{
                        paragraph: ({children}) => <p
                            className="py-16 text-center max-w-[28rem] mx-auto">{children}</p>,
                    }}
                />}
            <div className="flex items-center justify-center gap-3">
                <Image className="rounded-full size-14 object-cover" src={avatar ? avatar : emptyImg.src}
                       alt={avatarAlt ? avatarAlt : ""} width={56} height={56}/>
                <div className="flex flex-col">
                    <span className="text-accent text-base font-bold capitalize">{firstname} {name}</span>
                    <span className="text-sm text-grayscale-darker capitalize">{job} / {company}</span>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
