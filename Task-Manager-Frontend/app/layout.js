// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Görev Takip',
  description: 'Spring Boot + Next.js Görev Takip Uygulaması',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
