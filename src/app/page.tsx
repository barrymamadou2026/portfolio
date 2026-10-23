import { existsSync } from "node:fs";
import path from "node:path";
import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
  Tag,
} from "@once-ui-system/core";
import { home, about, person, baseURL, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { getPublicAssetUrl } from "@/utils/getPublicAssetUrl";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const cvAvailable = existsSync(path.join(process.cwd(), "public", "Mamadou_Barry_CV.pdf"));
  const avatarUrl = getPublicAssetUrl(person.avatar, baseURL);

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          ...(avatarUrl ? { image: avatarUrl } : {}),
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={200} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={400} horizontal="center">
            <Row gap="8" wrap horizontal="center">
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                View my projects
              </Button>
              {cvAvailable && (
                <Button
                  href="/Mamadou_Barry_CV.pdf"
                  variant="secondary"
                  size="m"
                  prefixIcon="document"
                >
                  Download CV
                </Button>
              )}
              <Button href={about.path} variant="secondary" size="m">
                About me
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>
      <Row fillWidth wrap gap="8" horizontal="center" aria-label="Core technologies">
        {["Java", "Spring Boot", "NestJS", "Next.js", "PostgreSQL", "Cloud", "Networking"].map(
          (technology) => (
            <Tag key={technology} size="m">
              {technology}
            </Tag>
          ),
        )}
      </Row>
      <RevealFx translateY="16" delay={600}>
        <Projects range={[1, 3]} />
      </RevealFx>
    </Column>
  );
}
