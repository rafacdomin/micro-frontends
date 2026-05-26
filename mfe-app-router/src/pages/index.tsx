import React from 'react';
import dynamic from 'next/dynamic';

// Wrap the entire page in a dynamic import with ssr:false to avoid
// NextFederationPlugin's SSR React context conflicts
const ProfilePage = dynamic(
  () => import('@/components/ProfilePage'),
  { ssr: false }
);

export default function Home() {
  return <ProfilePage />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
