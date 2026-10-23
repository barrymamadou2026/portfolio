import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    if (a.metadata.sortOrder !== undefined && b.metadata.sortOrder !== undefined) {
      return a.metadata.sortOrder - b.metadata.sortOrder;
    }
    if (a.metadata.sortOrder !== undefined) return -1;
    if (b.metadata.sortOrder !== undefined) return 1;

    return (
      new Date(b.metadata.publishedAt ?? 0).getTime() -
      new Date(a.metadata.publishedAt ?? 0).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          imageAlts={post.metadata.imageAlts}
          technologies={post.metadata.technologies}
          title={post.metadata.title}
          description={post.metadata.subtitle
            ? `${post.metadata.subtitle} — ${post.metadata.summary}`
            : post.metadata.summary}
          hasContent={post.content.trim() !== ""}
          avatars={
            post.metadata.team?.map((member) => ({
              src: member.avatar,
              "aria-label": member.name,
            })) || []
          }
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
