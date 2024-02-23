'use client';
import { SnackbarProvider } from 'notistack';

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default ToasterProvider;
