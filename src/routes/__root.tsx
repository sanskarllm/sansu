import { useEffect, useState } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CommandSearch } from "@/components/command-search";
import { Toaster } from "sonner";
import { useMill } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "PrivacyByAI";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "PrivacyByAI — privacy-first offline LLMs and careful cloud AI. Millhand for textile and manufacturing SMEs.",
      },
      { name: "theme-color", content: "#1a5c56" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  const [search, setSearch] = useState(false);
  useEffect(() => {
    void useMill.persist.rehydrate();
  }, []);

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader onSearch={() => setSearch(true)} />
            <div className="flex-1">
              <Outlet />
            </div>
            <SiteFooter />
          </div>
          <CommandSearch open={search} onOpenChange={setSearch} />
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "!bg-bg-elevated !text-fg !border-border",
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
