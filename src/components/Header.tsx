"use client";

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import {
  Button,
  Column,
  Dialog,
  Fade,
  Flex,
  Line,
  Row,
  Text,
  ToggleButton,
  useToast,
} from "@once-ui-system/core";

import { routes, display, person, about, work, gallery } from "@/resources";
import type { IconName } from "@/resources/icons";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

// Pages in the menu, in order. A page shows when its route is enabled in
// src/resources/once-ui.config.ts; add a page here to give it a menu item.
const navItems: { href: keyof typeof routes; icon: IconName; label: string }[] = [
  { href: "/about", icon: "person", label: about.label },
  { href: "/work", icon: "grid", label: work.label },
  { href: "/gallery", icon: "gallery", label: gallery.label },
];

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [contactOpen, setContactOpen] = useState(false);
  const { addToast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
    } catch {
      const emailInput = document.createElement("textarea");
      emailInput.value = person.email;
      emailInput.style.position = "fixed";
      emailInput.style.opacity = "0";
      document.body.appendChild(emailInput);
      emailInput.select();
      const copied = document.execCommand("copy");
      emailInput.remove();

      if (!copied) {
        addToast({ variant: "danger", message: "Unable to copy email address" });
        return;
      }
    }

    setContactOpen(false);
    addToast({ variant: "success", message: "Email copied" });
  };

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton
                  prefixIcon="home"
                  href="/"
                  aria-label="Home"
                  selected={pathname === "/"}
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {navItems.map(
                (item) =>
                  routes[item.href] && (
                    <Fragment key={item.href}>
                      <Row s={{ hide: true }}>
                        <ToggleButton
                          prefixIcon={item.icon}
                          href={item.href}
                          label={item.label}
                          selected={pathname.startsWith(item.href)}
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <ToggleButton
                          prefixIcon={item.icon}
                          href={item.href}
                          aria-label={item.label}
                          selected={pathname.startsWith(item.href)}
                        />
                      </Row>
                    </Fragment>
                  ),
              )}
                <Row s={{ hide: true }}>
                  <ToggleButton
                    prefixIcon="email"
                    label="Let's connect"
                    title="Contact me"
                    aria-label="Contact Mamadou Barry"
                    aria-haspopup="dialog"
                    aria-expanded={contactOpen}
                    onClick={() => setContactOpen(true)}
                  />
                </Row>
                <Row hide s={{ hide: false }}>
                  <ToggleButton
                    prefixIcon="email"
                    title="Contact me"
                    aria-label="Contact Mamadou Barry"
                    aria-haspopup="dialog"
                    aria-expanded={contactOpen}
                    onClick={() => setContactOpen(true)}
                  />
                </Row>
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
                {display.time && <TimeDisplay timeZone={person.timeZone} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
      <Dialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title="Contact Mamadou Barry"
        description="Choose how you would like to get in touch."
        closeOnClickaway
      >
        <Column gap="12" fillWidth>
          <Text variant="body-default-m">{person.email}</Text>
          <Row gap="8" wrap>
            <Button
              href={`mailto:${person.email}`}
              variant="primary"
              prefixIcon="email"
              aria-label="Send email to Mamadou Barry"
            >
              Send email
            </Button>
            <Button
              variant="secondary"
              prefixIcon="openLink"
              onClick={copyEmail}
              aria-label="Copy Mamadou Barry email address"
            >
              Copy email
            </Button>
          </Row>
        </Column>
      </Dialog>
    </>
  );
};
