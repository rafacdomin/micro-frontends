'use client';

import React from 'react';
import { RemotePage } from '@/components/RemotePage';
import { remoteUrls } from '@/lib/remotes';

export default function Page2() {
  return (
    <RemotePage
      remoteName="mfe_app_router"
      remoteUrl={remoteUrls.mfe_app_router}
      displayName="mfe-app-router"
    />
  );
}
