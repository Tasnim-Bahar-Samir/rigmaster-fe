import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { StyledEngineProvider } from '@mui/material';
import ToasterProvider from '@/components/providers/ToasterProvider';
import TanStackQueryProvider from '@/components/providers/TanStackQueryProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth/authOptions';
import NextAuthProvider from '@/components/providers/NextAuthProvider';
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
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
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
