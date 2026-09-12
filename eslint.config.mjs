import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react", "^next"], // framework first
            [String.raw`^@?\w`], // other packages
            ["^@/"], // our own modules
            [String.raw`^\.`], // relative
            [String.raw`^.+\.css$`], // styles last
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      // console.warn/error are intentional; console.log usually isn't, and in
      // a Server Action it ends up in production server logs.
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
