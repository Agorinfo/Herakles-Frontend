import {MetadataRoute} from "next";
import getServices from "@/actions/getServices";
import getSolutions from "@/actions/getSolutions";
import getAllRessources from "@/actions/getAllRessources";
import {getCanonicalUrl} from "@/lib/seo";

const now = new Date();

function getLastModified(item: {attributes?: {updatedAt?: string; publishedAt?: string}}) {
    return item.attributes?.updatedAt || item.attributes?.publishedAt || now;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: getCanonicalUrl("/"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: getCanonicalUrl("/qui-sommes-nous"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: getCanonicalUrl("/services"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: getCanonicalUrl("/solutions"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: getCanonicalUrl("/ressources"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    const serviceSlugs = await getServices();
    const solutionSlugs = await getSolutions();
    const ressourceSlugs = await getAllRessources();

    const dynamicServicePages = serviceSlugs.map((data: { attributes: { slug: string; updatedAt?: string; publishedAt?: string } }) => ({
        url: getCanonicalUrl(`/services/${data.attributes.slug}`),
        lastModified: getLastModified(data),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const dynamicSolutionPages = solutionSlugs.map((data: { attributes: { slug: string; updatedAt?: string; publishedAt?: string } }) => ({
        url: getCanonicalUrl(`/solutions/${data.attributes.slug}`),
        lastModified: getLastModified(data),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const dynamicRessourcePages = ressourceSlugs.data.map((data: { attributes: { slug: string; updatedAt?: string; publishedAt?: string } }) => ({
        url: getCanonicalUrl(`/ressources/${data.attributes.slug}`),
        lastModified: getLastModified(data),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [
        ...staticPages,
        ...dynamicServicePages,
        ...dynamicSolutionPages,
        ...dynamicRessourcePages,
    ];
}
