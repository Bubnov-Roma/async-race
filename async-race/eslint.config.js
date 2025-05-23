import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
  { ignores: ["node_modules/"] },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    extends: [
      eslintPluginUnicorn.configs.recommended,
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      noInlineConfig: true,
    },
    rules: {
      "@typescript-eslint/no-unsafe-argument": "false",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
      "unicorn/better-regex": "error",
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.builtin,
    },
  }
);
