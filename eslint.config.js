import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {ignores: ["build", "node_modules", "src/assets", "dist"]},
  {
    files: ["**/*.{ts,tsx}"],
    // `prettier` last to disable any stylistic rules that would fight Prettier.
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {...globals.browser, ...globals.node}
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {allowConstantExport: true}
      ],
      // Disabled project-wide: a few external/dynamic data shapes (e.g. GitHub
      // API responses) are intentionally typed `any`. Revisit if those narrow.
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
);
