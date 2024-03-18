import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { StyledEngineProvider } from '@mui/material';
import ToasterProvider from '@/components/providers/ToasterProvider';
import TanStackQueryProvider from '@/components/providers/TanStackQueryProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/authOptions';
import NextAuthProvider from '@/components/providers/NextAuthProvider';
import Script from 'next/script';
// import { SnackbarProvider } from 'notistack';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['devanagari', 'latin'],
});

export const metadata: Metadata = {
  title: 'Rigmaster',
  description: 'Unique Trend of Fashion Wear',
  icons: '/favicon.ico',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Rigmaster',
    // images: [
    //   {
    //     url: `https://the-yolo-studio.sgp1.cdn.digitaloceanspaces.com/tammlit.com/assets/tammlit_og.jpg`,
    //   },
    // ],
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      'facebook-domain-verification': 'xb6racmlfyevcqnfppw9oxytb9huf2',
    },
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      {/* Meta Pixel Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '944785684196932');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* End Meta Pixel Code */}
      <body className={poppins.className}>
        <StyledEngineProvider injectFirst>
          <ToasterProvider>
            <TanStackQueryProvider>
              <NextAuthProvider session={session}>{children}</NextAuthProvider>
            </TanStackQueryProvider>
          </ToasterProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
};
export default RootLayout;
