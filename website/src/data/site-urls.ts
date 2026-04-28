function readEnv(name: string): string | undefined {
  const viteValue = import.meta.env[name]
  if (typeof viteValue === "string" && viteValue.length > 0) {
    return viteValue
  }

  if (typeof process !== "undefined") {
    const processValue = process.env[name]
    if (typeof processValue === "string" && processValue.length > 0) {
      return processValue
    }
  }

  return undefined
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "")
}

/**
 * Public repository — used for GitHub / clone links across the site.
 * Keep in sync with the root package.json repository field when the canonical URL changes.
 */
export const BOHR_GITHUB_REPO_URL = trimTrailingSlash(
  readEnv("PUBLIC_BOHR_GITHUB_REPO_URL") || "https://github.com/Dhruvil7694/BohrAI",
)

/** HTTPS remote for `git clone …` copy-paste blocks */
export const BOHR_GIT_CLONE_HTTPS = `${BOHR_GITHUB_REPO_URL}.git`

/**
 * Public site root used for canonical URLs when a client hosts the website.
 * Defaults to a local-style hostname so internal deployments can override it cleanly.
 */
export const BOHR_SITE_URL = trimTrailingSlash(readEnv("PUBLIC_BOHR_SITE_URL") || "https://bohr.local")

/** Raw GitHub base for installer scripts until a client-specific host is configured. */
export const BOHR_GITHUB_RAW_BASE_URL = `${BOHR_GITHUB_REPO_URL.replace(
  "https://github.com/",
  "https://raw.githubusercontent.com/",
)}/main/website/public`

/**
 * Base URL that serves install scripts. Internal/public client deployments should override this at build time.
 * Example: https://bohr.company.example/installers
 */
export const BOHR_INSTALL_BASE_URL = trimTrailingSlash(readEnv("PUBLIC_BOHR_INSTALL_BASE_URL") || BOHR_GITHUB_RAW_BASE_URL)

export const BOHR_INSTALL_SH_URL = `${BOHR_INSTALL_BASE_URL}/install`
export const BOHR_INSTALL_PS1_URL = `${BOHR_INSTALL_BASE_URL}/install.ps1`
export const BOHR_INSTALL_SKILLS_SH_URL = `${BOHR_INSTALL_BASE_URL}/install-skills`
export const BOHR_INSTALL_SKILLS_PS1_URL = `${BOHR_INSTALL_BASE_URL}/install-skills.ps1`
