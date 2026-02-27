export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rachnax',
    url: 'https://www.rachnax.com',
    description:
      'Rachnax is the platform where creators, students, and professionals showcase projects, build portfolios, get recognized, and get hired.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.rachnax.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rachnax',
      url: 'https://www.rachnax.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.rachnax.com/logo.png',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@rachnax.com',
        contactType: 'customer support',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
