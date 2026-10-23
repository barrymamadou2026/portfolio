import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Carousel,
  Grid,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import type { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { getPublicAssetUrl } from "@/utils/getPublicAssetUrl";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
      "aria-label": person.name,
    })) || [];
  const avatarUrl = getPublicAssetUrl(person.avatar, baseURL);

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          ...(avatarUrl ? { image: avatarUrl } : {}),
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.subtitle || (post.metadata.publishedAt && formatDate(post.metadata.publishedAt))}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, index) => (
              <span key={member.name}>
                {index > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length >= 3 ? (
        <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16">
          {post.metadata.images.map((image, index) => (
            <Media
              key={image}
              priority={index === 0}
              sizes="(max-width: 560px) 100vw, 50vw"
              aspectRatio="4 / 3"
              radius="m"
              alt={
                post.metadata.imageAlts?.[index] ||
                `${post.metadata.title}: ${image
                  .split("/")
                  .pop()
                  ?.replace(/\.[^.]+$/, "")
                  .replace(/[-_]/g, " ")}`
              }
              src={image}
            />
          ))}
        </Grid>
      ) : post.metadata.images.length > 0 ? (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={post.metadata.images.map((image, index) => ({
            slide: image,
            alt:
              post.metadata.imageAlts?.[index] ||
              `${post.metadata.title}: ${image
                .split("/")
                .pop()
                ?.replace(/\.[^.]+$/, "")
                .replace(/[-_]/g, " ")}`,
          }))}
        />
      ) : null}
      {post.metadata.link && post.slug !== "identiguinee-citizen-digital-platform" && (
        <Row horizontal="center" gap="16" wrap>
          <Button
            href={post.metadata.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="m"
            suffixIcon="arrowUpRightFromSquare"
          >
            Live Demo
          </Button>
          <SmartLink href={post.metadata.detailsAnchor || "#the-problem"} suffixIcon="arrowRight">
            <Text variant="body-default-s">Project Details</Text>
          </SmartLink>
        </Row>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX
          source={post.content}
          components={
            post.slug === "identiguinee-citizen-digital-platform"
              ? {
                  ProjectDemoMedia: () => (
                    <Column fillWidth gap="16" marginY="16">
                      {post.metadata.link && (
                        <Row>
                          <Button
                            href={post.metadata.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                            size="m"
                            suffixIcon="arrowUpRightFromSquare"
                          >
                            Live Demo
                          </Button>
                        </Row>
                      )}
                      {post.metadata.video && (
                        // biome-ignore lint/a11y/useMediaCaption: No captions or transcript were supplied with this real demo; do not fabricate them.
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          poster={post.metadata.videoPoster || undefined}
                          width={1280}
                          height={720}
                          aria-label="IdentiGuinée platform demo video"
                          style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            aspectRatio: "16 / 9",
                            borderRadius: "var(--radius-m)",
                            background: "var(--neutral-alpha-weak)",
                          }}
                        >
                          <source src={post.metadata.video} type="video/mp4" />
                          Your browser does not support HTML5 video.
                        </video>
                      )}
                      {post.metadata.video && (
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          Captions or a transcript were not supplied for this demo.
                        </Text>
                      )}
                      {post.metadata.images.length > 0 && (
                        <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16">
                          {post.metadata.images.map((image, index) => (
                            <Media
                              key={image}
                              priority={index === 0}
                              sizes="(max-width: 560px) 100vw, 50vw"
                              aspectRatio={index === 0 ? "16 / 9" : "4 / 3"}
                              radius="m"
                              alt={
                                post.metadata.imageAlts?.[index] ||
                                `IdentiGuinée project image ${index + 1}`
                              }
                              src={image}
                            />
                          ))}
                        </Grid>
                      )}
                    </Column>
                  ),
                }
              : undefined
          }
        />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
