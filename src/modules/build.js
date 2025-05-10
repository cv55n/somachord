import * as esbuild from "esbuild";

export async function buildFront() {
    try {
        await esbuild.build({
            entryPoints: ['src/front/somachord.js', 'src/front/somachord.css'],
            outdir: `min/`,
            minify: true,
            loader: {".js": "js", ".css": "css"}
        });
    } catch (e) {
        return;
    }
}