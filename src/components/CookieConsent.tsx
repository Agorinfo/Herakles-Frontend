"use client"
import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import img from "../../public/cookie-consent-img.png"
import {initGoogleAnalytics} from "@/utils/analytic";

const COOKIE_NAME = 'userConsent';

type Consents = {
    necessary: boolean;
    analytics: boolean;
    advertising: boolean;
};

const defaultConsents: Consents = {
    necessary: true,
    analytics: false,
    advertising: false,
};

const CookieConsent: React.FC = () => {
    const [consents, setConsents] = useState<Consents>(defaultConsents);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [analyticsAvailable, setAnalyticsAvailable] = useState<boolean>(false);
    const [advertisingAvailable, setAdvertisingAvailable] = useState<boolean>(false);
    const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

    useEffect(() => {
        const savedConsents = Cookies.get(COOKIE_NAME);
        if (savedConsents) {
            const parsedConsents: Consents = JSON.parse(savedConsents);
            setConsents(parsedConsents);
            if (parsedConsents.analytics) {
                initGoogleAnalytics(trackingId!);
            }
        } else {
            setIsVisible(true);
        }

        // Check for existing analytics and advertising cookies
        setAnalyticsAvailable(document.cookie.includes('analytics=true'));
        setAdvertisingAvailable(document.cookie.includes('advertising=true'));
    }, []);

    const handleAcceptAll = () => {
        const updatedConsents: Consents = {necessary: true, analytics: true, advertising: true};
        setConsents(updatedConsents);
        Cookies.set(COOKIE_NAME, JSON.stringify(updatedConsents), {expires: 365});
        initGoogleAnalytics(trackingId!);
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        Cookies.set(COOKIE_NAME, JSON.stringify(consents), {expires: 365});
        if (consents.analytics) {
            initGoogleAnalytics(trackingId!);
        }
        setIsVisible(false);
    };

    const handleConsentChange = (type: keyof Consents, value: boolean) => {
        setConsents(prevConsents => ({...prevConsents, [type]: value}));
    };

    const handleManageCookies = () => {
        setIsVisible(true);
    };

    return (
        <div className={`fixed bottom-4 left-4 p-6 rounded-xl z-50 ${isVisible ? "bg-white" : "bg-transparent"}`}>
            <img
                className={`${isVisible ? "size-32 -top-16" : "size-12 top-0 left-0"} absolute  right-4`}
                src={img.src} alt="Gestion des cookies"
                onClick={handleManageCookies}
            />
            {isVisible && (
                <div>
                    <h2 className="pb-4 text-xl font-semibold">Gestion des cookies</h2>
                    <p className="pb-4">Nous utilisons des cookies pour améliorer votre expérience.</p>
                    <div className="pb-4 flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                className='text-accent focus:ring-accent'
                                type="checkbox"
                                checked={consents.necessary}
                                disabled
                            />
                            Cookies nécessaires
                        </label>
                        {analyticsAvailable && (
                            <label className="flex items-center gap-2">
                                <input
                                    className='text-accent focus:ring-accent'
                                    type="checkbox"
                                    checked={consents.analytics}
                                    onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                                />
                                Cookies analytiques
                            </label>
                        )}
                        {advertisingAvailable && (
                            <label className="flex items-center gap-2">
                                <input
                                    className='text-accent focus:ring-accent'
                                    type="checkbox"
                                    checked={consents.advertising}
                                    onChange={(e) => handleConsentChange('advertising', e.target.checked)}
                                />
                                Cookies publicitaires
                            </label>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="btn btn-accent" onClick={handleAcceptAll}>Tout accepter</button>
                        <button className="btn btn-gray" onClick={handleSavePreferences}>Enregistrer mes préférences
                        </button>
                    </div>
                </div>
            )}
            {/*{!isVisible && (*/}
            {/*    <button className="fixed bottom-4 left-4 bg-white p-6 rounded-xl z-50 btn btn-manage-cookies" onClick={handleManageCookies}>*/}
            {/*        Gérer les cookies*/}
            {/*    </button>*/}
            {/*)}*/}
        </div>
    );
};

export default CookieConsent;
