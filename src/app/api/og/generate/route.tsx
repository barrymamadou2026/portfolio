import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/resources";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "I build reliable software and explore the systems that make it scale.";
  const avatarPath = path.join(process.cwd(), "public", person.avatar.replace(/^\/+/, ""));
  const avatarAvailable = existsSync(avatarPath);
  const avatarData = avatarAvailable
    ? `data:image/jpeg;base64,${readFileSync(avatarPath).toString("base64")}`
    : undefined;

  async function loadGoogleFont(font: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status === 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error("failed to load font data");
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "6rem",
        background: "#101522",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2.5rem",
          fontStyle: "normal",
          color: "white",
        }}
      >
        <span
          style={{
            padding: "1rem",
            fontSize: "3.75rem",
            lineHeight: "4.25rem",
            whiteSpace: "wrap",
            textWrap: "balance",
            overflow: "hidden",
          }}
        >
          {title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            width: "100%",
          }}
        >
          {avatarData && (
            <img
              src={avatarData}
              style={{
                width: "10rem",
                height: "10rem",
                flexShrink: 0,
                objectFit: "cover",
                borderRadius: "100%",
              }}
              alt={person.name}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              flex: 1,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: "3.5rem",
                lineHeight: "4rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
              }}
            >
              {person.name}
            </span>
            <span
              style={{
                fontSize: "1.5rem",
                lineHeight: "2rem",
                whiteSpace: "pre-wrap",
                textWrap: "balance",
                opacity: "0.6",
              }}
            >
              {person.role}
            </span>
            <span
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                color: "#aebbd2",
              }}
            >
              Software Engineering · Systems · Cloud
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist:wght@400"),
          style: "normal",
        },
      ],
    },
  );
}
