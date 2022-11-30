/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LS_LOGGED_IN_USER_KEY_NAME?: string,

    readonly VITE_BACKEND_SCHEME?: string,
    readonly VITE_BACKEND_DOMAN?: string,
    readonly VITE_BACKEND_PORT?: string,

    readonly VITE_PORT?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}