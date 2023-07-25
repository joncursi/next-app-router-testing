'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();

  return <div>Slug: {searchParams?.get('slug')}</div>;
};

export default Page;
