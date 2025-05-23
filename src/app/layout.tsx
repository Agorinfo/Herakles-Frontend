import {Open_Sans} from "next/font/google";
import "./globals.css";
import React from "react";
import getGlobal from "@/actions/getGlobal";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import UseReactQuery from "@/utils/useReactQuery";
import getMenu from "@/actions/getMenu";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import getFooter from "@/actions/getFooter";
import {Toaster} from "react-hot-toast";
import Modal from "@/components/Modal";
import CookieConsent from "@/components/CookieConsent";
import Maintenance from "@/components/Maintenance";

const openSans = Open_Sans({subsets: ["latin"]});

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient()
    const global = await getGlobal();

    await queryClient.prefetchQuery({
        queryKey: ["global"],
        queryFn: async () => JSON.parse(JSON.stringify(await getGlobal())),
    });
    await queryClient.prefetchQuery({
        queryKey: ["menu"],
        queryFn: async () => JSON.parse(JSON.stringify(await getMenu())),
    });
    await queryClient.prefetchQuery({
        queryKey: ["footer"],
        queryFn: async () => JSON.parse(JSON.stringify(await getFooter())),
    });

    if (global.maintenance === true && process.env.NODE_ENV === "production") {
        return (
            <html lang="fr" className="scroll-smooth">
            <body className={`${openSans.className} overflow-x-hidden`}>
            <Maintenance/>
            </body>
            </html>
        );
    }

    return (
        <html lang="fr" className="scroll-smooth overflow-x-clip">
        <body className={`${openSans.className} overflow-x-clip`}>
        <CookieConsent/>
        <UseReactQuery>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div id="modal-root"></div>
                <Modal/>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <Header/>
                <div className="content-grid">
                    {children}
                </div>
                <Footer/>
            </HydrationBoundary>
        </UseReactQuery>
        </body>
        </html>
    );
}
