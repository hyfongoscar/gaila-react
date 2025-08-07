import { defineConfig, globalIgnores } from "eslint/config";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";

import react from "eslint-plugin-react";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import js from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";

import fs  from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"));

export default defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "react-app",
        "react-app/jest",
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
    )),
    plugins: {
        react: fixupPluginRules(react),
        import: fixupPluginRules(_import),
        prettier,
        "simple-import-sort": simpleImportSort,
    },
    rules: {
        "import/order": ["off"],
        "react/display-name": "off",
        "react/jsx-sort-props": "warn",
        "prettier/prettier": ["error", prettierOptions],

        "simple-import-sort/imports": ["warn", {
            groups: [
                ["^react$"],
                ["^\\u0000"],
                ["^@?\\w"],
                ["^components(/.*|$)"],
                ["^containers(/.*|$)"],
                ["^(types|utils|api|config|styles|pages)(/.*|$)"],
                ["^\\."],
            ],
        }],

        "simple-import-sort/exports": "warn",
        "import/first": "warn",
        "import/newline-after-import": "warn",
        "import/no-duplicates": "error",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_|React",
        }],
    },
}, {
    files: ["**/*.ts?(x)"],
    rules: {
        "prettier/prettier": ["warn", prettierOptions],
    },
}, globalIgnores(["**/*.lib.js", "**/*.min.js"])]);
