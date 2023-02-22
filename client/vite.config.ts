import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import svgr from 'vite-plugin-svgr';
// import tsconfigPaths from "vite-tsconfig-paths";

const getPathName = (name: string, isInRoot?: boolean) =>
    path.resolve(__dirname, isInRoot ? `./${name}` : `./src/${name}`);

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: 'public',
    server: {
        port: 8090,
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    resolve: {
        alias: {
            atoms: getPathName('components/atoms'),
            molecules: getPathName('components/molecules'),
            organisms: getPathName('components/organisms'),
            templates: getPathName('components/templates'),
            pages: getPathName('components/pages'),
            icons: getPathName('icons'),
            styles: getPathName('styles'),
            constants: getPathName('constants'),
            enums: getPathName('enums'),
            utils: getPathName('utils'),
            interfaces: getPathName('interfaces'),
            api: getPathName('api'),
            '~normalize.css': getPathName('node_modules/normalize.css', true),
            '~styles': getPathName('src/styles', true),
        },
    },
    plugins: [EnvironmentPlugin(['API_URL', 'GOOGLE_CLIENT_ID']), svgr(), react()],
});
