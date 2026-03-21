import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Jarvis - SAS Modernization Dashboard",
  description: "AI-Powered SAS Modernization Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#EE3524",
              colorBgContainer: "#ffffff",
              colorBgLayout: "#f4f6f9",
              colorText: "#1a1a2e",
              colorTextSecondary: "#64748b",
              colorBorder: "#e8ecf0",
              borderRadius: 8,
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            },
            components: {
              Menu: {
                itemBg: "transparent",
                itemColor: "#64748b",
                itemHoverBg: "#fff5f4",
                itemHoverColor: "#EE3524",
                itemSelectedBg: "#fff5f4",
                itemSelectedColor: "#EE3524",
                subMenuItemBg: "transparent",
              },
              Layout: {
                siderBg: "#ffffff",
                headerBg: "#ffffff",
                triggerBg: "#ffffff",
                triggerColor: "#64748b",
              },
              Badge: {
                colorBgContainer: "#ffffff",
              },
              Modal: {
                contentBg: "#ffffff",
                headerBg: "#ffffff",
                titleColor: "#1a1a2e",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
