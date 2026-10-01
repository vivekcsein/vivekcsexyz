import { z } from "zod";
import { STYLES_THEME_NAMES } from "../configs/styles.config";
import { parseEnv } from "../utils/parse-env";

// Public Environment Schema
const parsedEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("@vivekcsein"),

  NEXT_PUBLIC_APP_VERSION: z.string().trim().min(1).default("2.0.0"),

  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .trim()
    .min(1)
    .default(
      "A portfolio full stack developer with a passion for building scalable and high-performance web applications.",
    ),

  // Site
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  // Derived from next.config.ts (GitHub project-page sub-path). Never set by
  // hand: "" for a custom domain, "/<repo>" for username.github.io/<repo>.
  NEXT_PUBLIC_BASE_PATH: z
    .string()
    .trim()
    .regex(/^(\/[a-z0-9._-]+)*$/i)
    .default(""),

  NEXT_PUBLIC_SITE_TITLE: z
    .string()
    .trim()
    .min(1)
    .default("Top 1% Full stack developer with AI"),

  NEXT_PUBLIC_LOGO_URL: z.string().trim().min(1).default("/logo.png"),

  NEXT_PUBLIC_OG_IMAGE_URL: z.string().trim().optional(),

  // Theme
  NEXT_PUBLIC_ACTIVE_STYLE: z
    .enum(STYLES_THEME_NAMES)
    .default("cyantrix-theme"),

  // Theme
  NEXT_PUBLIC_ACTIVE_THEME: z
    .enum(["system", "light", "dark"])
    .default("system"),

  // Social
  NEXT_PUBLIC_TWITTER: z
    .string()
    .trim()
    .default("https://twitter.com/vivekcsein"),

  NEXT_PUBLIC_GITHUB: z
    .string()
    .trim()
    .default("https://github.com/vivekcsein"),

  NEXT_PUBLIC_LINKEDIN: z
    .string()
    .trim()
    .default("https://www.linkedin.com/showcase/vivekcsein"),

  // Author
  NEXT_PUBLIC_AUTHOR_NAME: z.string().trim().min(1).default("Vivek"),

  NEXT_PUBLIC_AUTHOR_HANDLE: z.string().trim().min(1).default("vivekcsein"),

  NEXT_PUBLIC_AUTHOR_EMAIL: z.email().default("ivivekcse@gmail.com"),

  NEXT_PUBLIC_AUTHOR_QUOTE: z
    .string()
    .trim()
    .min(1)
    .default("Discipline turns ideas into results."),

  // Google Verification
  // Blank (e.g. an unset CI variable) means "not configured".
  NEXT_PUBLIC_GOOGLE_VERIFICATION: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().min(1).optional(),
  ),
});

// Validated Public Environment
// BASE_PATH is referenced statically so Next can inline it into client bundles
// (a bare `process.env` object is empty in the browser).
const parsedEnv = parseEnv(parsedEnvSchema, "public", {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
});

// Public Application Config
export const envPublicConfig = Object.freeze({
  // App
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedEnv.NEXT_PUBLIC_APP_VERSION,
  APP_DESCRIPTION: parsedEnv.NEXT_PUBLIC_APP_DESCRIPTION,

  // Site
  SITE_URL: parsedEnv.NEXT_PUBLIC_SITE_URL,
  BASE_PATH: parsedEnv.NEXT_PUBLIC_BASE_PATH,
  SITE_TITLE: parsedEnv.NEXT_PUBLIC_SITE_TITLE,
  LOGO_URL: parsedEnv.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedEnv.NEXT_PUBLIC_OG_IMAGE_URL,

  // Theme
  ACTIVE_STYLE: parsedEnv.NEXT_PUBLIC_ACTIVE_STYLE,
  ACTIVE_THEME: parsedEnv.NEXT_PUBLIC_ACTIVE_THEME,

  // Social
  TWITTER: parsedEnv.NEXT_PUBLIC_TWITTER,
  LINKEDIN: parsedEnv.NEXT_PUBLIC_LINKEDIN,
  GITHUB: parsedEnv.NEXT_PUBLIC_GITHUB,

  // Author
  AUTHOR_NAME: parsedEnv.NEXT_PUBLIC_AUTHOR_NAME,
  AUTHOR_HANDLE: parsedEnv.NEXT_PUBLIC_AUTHOR_HANDLE,
  AUTHOR_EMAIL: parsedEnv.NEXT_PUBLIC_AUTHOR_EMAIL,
  AUTHOR_QUOTE: parsedEnv.NEXT_PUBLIC_AUTHOR_QUOTE,

  // Google Verification
  GOOGLE_VERIFICATION: parsedEnv.NEXT_PUBLIC_GOOGLE_VERIFICATION,
});

export type EnvPublicConfig = typeof envPublicConfig;
