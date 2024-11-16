import "ress";
import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import "@coinbase/onchainkit/styles.css";
import AppProvider from "@/providers/AppProvider";
import Web3Provider from "@/providers/Web3Provider";
import ReduxProvider from "@/states/global/provider";
import Header from "@/components/layout/header";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <ReduxProvider>
            <AppProvider>
              <Header />
              {children}
              <section id="modal-root" />
            </AppProvider>
          </ReduxProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
