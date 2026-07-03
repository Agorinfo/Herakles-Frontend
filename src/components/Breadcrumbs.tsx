import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {getCanonicalUrl} from "@/lib/seo";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export default function Breadcrumbs({items}: BreadcrumbsProps) {
    const breadcrumbs = [
        {
            label: "Accueil",
            href: "/",
        },
        ...items,
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: getCanonicalUrl(item.href || "#"),
        })),
    };

    return (
        <nav
            aria-label="Fil d'Ariane"
            className="py-4 text-sm text-grayscale-darker"
        >
            <JsonLd data={jsonLd}/>
            <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((item, index) => {
                    const isCurrent = index === breadcrumbs.length - 1;

                    return (
                        <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
                            {index > 0 && (
                                <span aria-hidden="true" className="text-accent-muted">
                                    /
                                </span>
                            )}
                            {item.href && !isCurrent ? (
                                <Link
                                    className="font-medium text-grayscale-darkest transition-colors duration-300 hover:text-accent"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current="page"
                                    className="font-semibold text-accent"
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
