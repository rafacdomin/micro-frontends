/// <reference types="react" />

// Module Federation remote containers are loaded at runtime via useFederatedComponent.
// No compile-time ambient module declarations needed for those.
// This file is reserved for future global type augmentations.

declare module '*.css';
declare module '*.scss';

// Explicit side-effect type definitions for design system packages to prevent IDE errors
declare module '@rafacdomin/ds-core/dist/index.css';

export {};
