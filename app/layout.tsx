import ServerLayout from "./ServerLayout";
import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
      <ServerLayout>
        <ClientLayout>{children}</ClientLayout>
      </ServerLayout>
      </body>
    </html>

  );
}