import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
    title,
    description,
    image,
    name = 'OnIT India',
    type = 'website',
    keywords,
    canonical,
    schema
}) {
    const defaultImage = "https://www.onitindia.com/logo-2.jpg";
    const seoImage = image || defaultImage;
    const siteUrl = "https://www.onitindia.com";
    const fullTitle = title ? `${title} | OnIT India` : 'OnIT India | Flexible Local Work & Campus Tasks';

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}
            <meta name="theme-color" content="#16a34a" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title || 'OnIT India'} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={name} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:url" content={canonical || siteUrl} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || 'OnIT India'} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:site" content="@onitindia" />

            {/* Structured Data (JSON-LD) */}
            {schema ? (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ) : (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "OnIT India",
                        "url": siteUrl,
                        "logo": defaultImage,
                        "sameAs": [
                            "https://twitter.com/onitindia",
                            "https://www.linkedin.com/company/onitindia"
                        ]
                    })}
                </script>
            )}
        </Helmet>
    );
}
