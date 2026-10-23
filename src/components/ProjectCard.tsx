"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  imageAlts?: string[];
  technologies?: string[];
  title: string;
  /** Whether the project has a case study page to link to. */
  hasContent: boolean;
  description: string;
  avatars: { src: string; "aria-label"?: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  imageAlts = [],
  technologies = [],
  title,
  hasContent,
  description,
  avatars,
  link,
}) => {
  return (
    <Column fillWidth gap="m">
      {images.length > 0 ? (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image, index) => ({
            slide: image,
            alt:
              imageAlts[index] ||
              `${title}: ${image
                .split("/")
                .pop()
                ?.replace(/\.[^.]+$/, "")
                .replace(/[-_]/g, " ")}`,
          }))}
        />
      ) : null}
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || hasContent) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            {technologies.length > 0 && (
              <Row gap="8" wrap>
                {technologies.map((technology) => (
                  <Tag key={technology} size="s">
                    {technology}
                  </Tag>
                ))}
              </Row>
            )}
            <Flex gap="24" wrap>
              {hasContent && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text variant="body-default-s">Live Demo</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
