import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  maxDescriptionCharacters?: number;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = React.memo(({ title }) => {
  const tags = [];

  // 페이지 제목
  if (title) {
    tags.push(<title key="title">{title}</title>);
  }

  return <Head>{tags}</Head>;
});

export default SEO;
