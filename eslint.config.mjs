import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "off", // 🚀 Allow @ts-ignore if needed
      "@typescript-eslint/no-unused-vars": "warn", // Changes no-unused-vars from error to warning
      "@typescript-eslint/await-thenable": "off", // ✅ Prevents Promise params issue
    },
  },
];

export default eslintConfig;
