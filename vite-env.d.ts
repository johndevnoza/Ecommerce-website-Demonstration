// vite-env.d.ts
/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
