import { DM_Serif_Display, Sora, Manrope } from "next/font/google";
import { business } from "@/data/cafeViana";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: business.seo.title,
  description: business.seo.description,
  metadataBase: new URL("https://cafeviana.example"),
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    locale: "en_AU",
    type: "website",
    siteName: business.name,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function JsonLd() {
  const hoursSpec = Object.entries(business.hours).map(([day, h]) => {
    const dayMap = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    };
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[day],
      opens: day === "sunday" ? "08:00" : "07:00",
      closes: "15:00",
    };
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: business.name,
    description: business.seo.description,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.2000044,
      longitude: 145.1820177,
    },
    url: business.mapsUrl,
    hasMap: business.mapsUrl,
    openingHoursSpecification: hoursSpec,
    sameAs: [business.facebook, business.instagram].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${dmSerif.variable} ${sora.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full bg-porcelain font-body text-espresso antialiased">
        <JsonLd />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
