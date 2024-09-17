import React from 'react';

function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "时空信箱",
    "description": "与过去的自己对话，通过AI技术体验穿越时空的对话，探索自我成长的奇妙旅程。",
    "url": "https://letter.aiself.site",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
}

export default StructuredData;