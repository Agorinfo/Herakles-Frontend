export const initGoogleAnalytics = (trackingId: string) => {
    if (!trackingId || typeof window === 'undefined') return;

    if (!window.dataLayer) {
        window.dataLayer = [];
    }

    function gtag(...args: any[]) {
        window.dataLayer.push(args);
    }

    if (!window.gtag) {
        window.gtag = gtag;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        document.head.appendChild(script);

        script.onload = () => {
            gtag('js', new Date());
            gtag('config', trackingId, {
                cookie_flags: 'SameSite=None; Secure',
            });
        };

        // Set a test cookie to indicate analytics is enabled
        document.cookie = "analytics=true; path=/";
    }
};
