import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt?: string;
  sortOrder?: number;
  mediaDirectory?: string;
  video?: string;
  videoPoster?: string;
  detailsAnchor?: string;
  technologies?: string[];
  summary: string;
  image?: string;
  images: string[];
  imageAlts?: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  const mediaDirectory = typeof data.mediaDirectory === "string" ? data.mediaDirectory : "";
  const publicRoot = path.resolve(process.cwd(), "public");
  const resolvedMediaDirectory = mediaDirectory
    ? path.resolve(publicRoot, mediaDirectory)
    : "";
  const isPublicDirectory =
    resolvedMediaDirectory === publicRoot || resolvedMediaDirectory.startsWith(`${publicRoot}${path.sep}`);
  const mediaFiles =
    resolvedMediaDirectory && isPublicDirectory && fs.existsSync(resolvedMediaDirectory)
      ? fs.readdirSync(resolvedMediaDirectory).filter((file) => fs.statSync(path.join(resolvedMediaDirectory, file)).isFile())
      : [];
  const imageFiles = mediaFiles
    .filter((file) => /\.(avif|gif|jpe?g|png|webp)$/i.test(file))
    .sort((left, right) => {
      const leftPriority = /^(acceuil|home|cover|poster)/i.test(left) ? 0 : 1;
      const rightPriority = /^(acceuil|home|cover|poster)/i.test(right) ? 0 : 1;
      return leftPriority - rightPriority || left.localeCompare(right);
    });
  const videoFiles = mediaFiles.filter((file) => /\.(mp4|webm|ogg)$/i.test(file));
  const discoveredImages = imageFiles.map(
    (file) => `/${path.posix.join(mediaDirectory.replace(/\\/g, "/"), file)}`,
  );
  const explicitImages = Array.isArray(data.images) ? data.images : [];
  const images = [...new Set([...explicitImages, ...discoveredImages])];
  const explicitVideo = typeof data.video === "string" ? data.video : "";
  const detectedVideo = videoFiles.find((file) => /^demo\./i.test(file)) || videoFiles[0];
  const video =
    explicitVideo ||
    (detectedVideo
      ? `/${path.posix.join(mediaDirectory.replace(/\\/g, "/"), detectedVideo)}`
      : "");

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    sortOrder: data.sortOrder,
    mediaDirectory,
    video,
    videoPoster: data.videoPoster || "",
    detailsAnchor: data.detailsAnchor || "",
    technologies: data.technologies || [],
    summary: data.summary || "",
    image: data.image || "",
    images,
    imageAlts: data.imageAlts || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  // Posts are read at build time. The ignore comment keeps Next from tracing
  // the whole project (images and video included) into every server function.
  const postsDir = path.join(/* turbopackIgnore: true */ process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
