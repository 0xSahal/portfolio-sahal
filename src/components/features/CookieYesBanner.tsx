import Script from 'next/script';

const COOKIEYES_SCRIPT_SRC =
  'https://cdn-cookieyes.com/client_data/6add2b76becb37f8cd48f6afd856abbf/script.js';

export default function CookieYesBanner() {
  return <Script id="cookieyes" src={COOKIEYES_SCRIPT_SRC} strategy="beforeInteractive" />;
}
