import type {Metadata} from "next";

type StrapiImageAttributes = {
    url?: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
    formats?: Record<string, {url?: string; width?: number; height?: number}>;
};

type StrapiImage = {
    data?: {
        attributes?: StrapiImageAttributes;
    } | null;
};

export type SeoMeta = {
    meta_title?: string | null;
    meta_description?: string | null;
    shareImage?: StrapiImage | null;
};

type BuildSeoMetadataOptions = {
    metas?: SeoMeta | null;
    global?: {
        siteName?: string | null;
        canonical_url?: string | null;
        favicon?: StrapiImage | null;
        metas?: SeoMeta | null;
    } | null;
    path?: string;
    fallbackTitle: string;
    fallbackDescription: string;
    fallbackImage?: StrapiImage | null;
    robots?: Metadata["robots"];
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
};

const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_SITE_NAME = "Edilogic";

export function getSiteUrl() {
    return stripTrailingSlash(
        process.env.FRONT_URL ||
        process.env.NEXT_PUBLIC_FRONT_URL ||
        DEFAULT_SITE_URL
    );
}

export function stripTrailingSlash(url: string) {
    return url.replace(/\/+$/, "");
}

export function normalizePath(path = "/") {
    if (!path || path === "/") return "/";
    return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function getCanonicalUrl(path = "/") {
    return `${getSiteUrl()}${normalizePath(path)}`;
}

export function resolveStrapiMediaUrl(image?: StrapiImage | null) {
    const url = image?.data?.attributes?.url;

    if (!url) return undefined;
    if (/^https?:\/\//i.test(url)) return url;

    const backUrl = stripTrailingSlash(process.env.BACK_URL || "");
    return backUrl ? `${backUrl}${url}` : url;
}

export function buildSeoMetadata({
                                     metas,
                                     global,
                                     path = "/",
                                     fallbackTitle,
                                     fallbackDescription,
                                     fallbackImage,
                                     robots,
                                     type = "website",
                                     publishedTime,
                                     modifiedTime,
                                 }: BuildSeoMetadataOptions): Metadata {
    const title = metas?.meta_title || fallbackTitle;
    const description = metas?.meta_description || fallbackDescription;
    const canonical = getCanonicalUrl(path);
    const siteName = global?.siteName || DEFAULT_SITE_NAME;
    const shareImageUrl = resolveStrapiMediaUrl(metas?.shareImage) || resolveStrapiMediaUrl(fallbackImage);
    const faviconUrl = resolveStrapiMediaUrl(global?.favicon);
    const images = shareImageUrl
        ? [{
            url: shareImageUrl,
            alt: metas?.shareImage?.data?.attributes?.alternativeText || title,
        }]
        : undefined;

    return {
        metadataBase: new URL(getSiteUrl()),
        title,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName,
            locale: "fr_FR",
            type,
            images,
            publishedTime,
            modifiedTime,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: shareImageUrl ? [shareImageUrl] : undefined,
        },
        icons: faviconUrl
            ? {
                icon: faviconUrl,
                apple: faviconUrl,
                shortcut: faviconUrl,
            }
            : undefined,
        robots,
    };
}

export function buildOrganizationJsonLd(global?: {
    siteName?: string | null;
    logo?: StrapiImage | null;
    canonical_url?: string | null;
} | null) {
    const siteUrl = getSiteUrl();
    const logoUrl = resolveStrapiMediaUrl(global?.logo);

    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: global?.siteName || DEFAULT_SITE_NAME,
        url: siteUrl,
        ...(logoUrl ? {logo: logoUrl} : {}),
    };
}

export function buildWebSiteJsonLd(global?: {siteName?: string | null} | null) {
    const siteUrl = getSiteUrl();

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: global?.siteName || DEFAULT_SITE_NAME,
        url: siteUrl,
        inLanguage: "fr-FR",
    };
}
