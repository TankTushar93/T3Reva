import React, { useEffect, useState } from 'react';

const ApiDemo = () => {
  const [pageData, setPageData] = useState({ text: '', img: '', hello: '' });

  useEffect(() => {
    fetch('https://t3-reva.t3planet.de/')
      .then((res) => res.json())
      .then((data) => {
        // Optional chaining for safe access
        const section = data?.content?.colPos0?.[6];

        const text =
          section?.content?.items?.[0]?.contentElements?.[0]?.content?.items?.[0]?.contentElements?.[0]?.content?.bodytext ||
          '';
        const img =
          section?.content?.items?.[0]?.contentElements?.[0]?.content?.items?.[1]?.contentElements?.[0]?.content
            ?.gallery?.rows?.[1]?.columns?.[1]?.publicUrl || '';

        // const header = data?.content?.colPos0?.[6].content.items[0].contentElements[0].content.items[0].contentElements[1].content.items[0].contentElements[1].content;
        const header = data?.content?.colPos0?.[6].content.items[0].contentElements[0].content.items[0].contentElements[1].content.items[1].contentElements[1].content.bodytext;
        const sectext = data?.content?.colPos0?.[6].content.items[0].contentElements[0].content.items[0].contentElements[1].content.items[0].contentElements[1].content.bodytext;
        let secntext = sectext.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
        setPageData({ text, img, header });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-black p-4">
      <h1 className="text-xl font-bold mb-4">API Data:</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(pageData, null, 2)}
      </pre>

      {pageData.text && (
        <p className="mt-4 text-gray-700">{pageData.text}</p>
      )}
      
      {pageData.img && (
        <img src={pageData.img} alt="Dynamic" className="mt-4 w-64 rounded" />
      )}
    </div>
  );
};

export default ApiDemo;
