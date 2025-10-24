import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bloxify Services: Cheap Boosting Service',
  description: 'Get Discord Server Boosts for just $0.27 with instant delivery, 24/7 support, and 100% safe automated services with Over 3,000 positive reviews.',
  keywords: [
    'cheapest discord boosts',
    'cheap discord server boosts',
    'buy discord boosts $0.27',
    'discord boost cheap',
    'affordable discord boosting',
    'discord server boost level 3',
    'instant discord boosts',
    'automated discord boosting service',
    'safe discord boost provider',
    'discord nitro cheap deals',
    'discord server growth',
    'discord boost deals 2025',
    'fastest discord boosting',
    'reliable discord boost service',
    'discord community growth',
    'best discord boost prices',
    'discord boost comparison',
    'cheapest server boosting service',
  ].join(', '),
    
  icons: {
    icon: [
      {
        url: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/logo.png',
  },
  
  manifest: '/site.webmanifest',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bloxify.services',
    siteName: 'Bloxify Services - #1 Boosting Service',
    title: 'Bloxify Services: Cheap Boosting Service',
    description: 'Get Discord Server Boosts for just $0.27 with instant delivery, 24/7 support, and 100% safe automated services with Over 3,000 positive reviews.',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Bloxify Services',
        type: 'image/png',
      },
      {
        url: '',
        width: 1080,
        height: 1080,
        alt: 'Bloxify Services | Discord Boosting Service',
        type: 'image/png',
      },
    ],
  },
  
  
  alternates: {
    canonical: 'https://bloxify.services',
    languages: {
      'en-US': 'https://bloxify.services/en-us',
      'en': 'https://bloxify.services',
    },
  },
  
  other: {
    'price:currency': 'USD',
    'price:amount': '0.27',
    'product:availability': 'in_stock',
    'product:condition': 'new',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:region': 'Worldwide',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.sell.app/embed/style.css" rel="stylesheet" />
        
        <link
          href="https://cdn.paylix.gg/static/css/embed.css"
          rel="stylesheet"
        />
        <script
          src="https://cdn.paylix.gg/static/js/embed.js"
          async
        ></script>
        
        <link rel="icon" href="/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" type="image/png" />
        
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2b2d31" />
        <meta name="msapplication-TileColor" content="#6b7280" />
        <meta name="application-name" content="Bloxify Services" />
        <meta name="apple-mobile-web-app-title" content="Bloxify Services" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Bloxify Services Discord Server Boosting",
              "description": "Get Discord Server Boosts for just $0.27 with instant delivery, 24/7 support, and 100% safe automated services with Over 3,000 positive reviews.",
              "provider": {
                "@type": "Organization",
                "name": "Bloxify Services",
                "url": "https://bloxify.services"
              },
              "serviceType": "Discord Server Boosting",
              "offers": {
                "@type": "Offer",
                "price": "0.27",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              },
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Discord Boosting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Discord Server Boost"
                    },
                    "price": "0.27",
                    "priceCurrency": "USD"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="css-loading-screen">
          <div className="css-loading-content">
            <div className="css-loading-logo-container">
              <div className="css-loading-logo"></div>
            </div>
          </div>
          <div className="css-loading-circle-container">
            <div className="css-loading-circle"></div>
          </div>
        </div>

        <div className="professional-bg"></div>

        <div className="relative z-10 page-content">{children}</div>

        <Script
          src="https://cdn.sell.app/embed/script.js"
          type="module"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}