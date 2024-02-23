import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { StyledEngineProvider } from '@mui/material';
import ToasterProvider from '@/components/providers/ToasterProvider';
// import { SnackbarProvider } from 'notistack';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['devanagari', 'latin'],
});

export const metadata: Metadata = {
  title: 'Rigmaster',
  description: 'A clothing e-commerce.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
        <ToasterProvider>
          <body className={poppins.className}>{children}</body>
        </ToasterProvider>
      </StyledEngineProvider>
    </html>
  );
};
export default RootLayout;
