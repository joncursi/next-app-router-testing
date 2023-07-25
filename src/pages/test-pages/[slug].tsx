import React from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const { query }= useRouter();

  return (
    <main>
      <div>Slug: {query.slug}</div>
    </main>
  );
};

export default Page;
