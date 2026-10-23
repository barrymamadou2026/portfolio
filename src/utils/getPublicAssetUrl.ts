import { existsSync } from "node:fs";
import path from "node:path";

export function getPublicAssetUrl(assetPath: string, baseURL: string): string | undefined {
  const publicPath = path.join(process.cwd(), "public", assetPath.replace(/^\/+/, ""));

  return existsSync(publicPath) ? `${baseURL}${assetPath}` : undefined;
}
