'use client';

import React from 'react';
import { RemotePage } from '@/components/RemotePage';
import { remoteUrls } from '@/lib/remotes';

export default function Page1() {
  return (
    <RemotePage
      remoteName="mfe_pages_router"
      remoteUrl={remoteUrls.mfe_pages_router}
      displayName="mfe-pages-router"
    />
  );
}
