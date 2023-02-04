declare module '*.scss';

declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
    import { ISVGComponent } from 'interfaces/ISVGComponent';

    export const ReactComponent: ISVGComponent;

    const src: string;
    export default src;
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
