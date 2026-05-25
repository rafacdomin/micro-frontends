'use client';

import React from 'react';
import { RemotePage } from '@/components/RemotePage';
import { remoteUrls } from '@/lib/remotes';

export default function CatalogPage() {
  return (
    <RemotePage
      remoteName="mfe_react"
      remoteUrl={remoteUrls.mfe_react}
      displayName="mfe-react"
    />
  );
}
