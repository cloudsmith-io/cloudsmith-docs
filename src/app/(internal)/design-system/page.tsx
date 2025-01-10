import { cx } from 'class-variance-authority';
import { Card, Flex, HomepageHero, Button, BlockImage } from '@/components';

import horizontalImage from '@/content/images/horizontal.png';
import verticalImage from '@/content/images/vertical.png';

import styles from './page.module.css';

export default function DesignSystemPage() {
  return (
    <div className={styles.root}>
      <section id="buttons" className={cx(styles.section, styles.container)}>
        <h2 className={styles.sectionHeading}>Buttons</h2>

        <h3>Primary Buttons</h3>
        <Flex gap="m" align="center" className={styles.flexContainer}>
          <Button href="/" size="small">
            Small Button
          </Button>
          <Button href="/">Medium Button</Button>
          <Button href="/" size="large">
            Large Button
          </Button>
          <Button href="/" size="xlarge">
            XLarge Button
          </Button>
        </Flex>

        <h3 className={styles.subHeading}>Secondary Buttons</h3>
        <Flex gap="m" align="center" className={styles.flexContainer}>
          <Button href="/" variant="secondary" size="small">
            Small Button
          </Button>
          <Button href="/" variant="secondary">
            Medium Button
          </Button>
          <Button href="/" variant="secondary" size="large">
            Large Button
          </Button>
          <Button href="/" variant="secondary" size="xlarge">
            XLarge Button
          </Button>
        </Flex>

        <h3 className={styles.subHeading}>Link Buttons</h3>
        <Flex gap="m" align="center" className={styles.flexContainer}>
          <Button href="/" variant="link" size="small">
            Small Link
          </Button>
          <Button href="/" variant="link">
            Medium Link
          </Button>
          <Button href="/" variant="link" size="large">
            Large Link
          </Button>
          <Button href="/" variant="link" size="xlarge">
            XLarge Link
          </Button>
        </Flex>

        <h3 className={styles.subHeading}>Color Schemes</h3>
        <Flex gap="m" align="center" className={styles.flexContainer}>
          <Button href="/" colorScheme="accent">
            Accent Button
          </Button>
          <Button href="/" colorScheme="text">
            Text Button
          </Button>
          <Button href="/" colorScheme="dark">
            Dark Button
          </Button>
          <Button href="/" colorScheme="light">
            Light Button
          </Button>
        </Flex>

        <h3 className={styles.subHeading}>With Arrow</h3>
        <Flex gap="m" align="center" className={styles.flexContainer}>
          <Button href="/" withArrow>
            Primary with Arrow
          </Button>
          <Button href="/" variant="secondary" withArrow>
            Secondary with Arrow
          </Button>
          <Button href="/" variant="link" withArrow>
            Link with Arrow
          </Button>
        </Flex>

        <h3 className={styles.subHeading}>Widths</h3>
        <Flex gap="m" align="center" className={styles.flexContainer}>
          <Button href="/" width="small">
            Small
          </Button>
          <Button href="/" width="medium">
            Medium
          </Button>
          <Button href="/" width="large">
            Large
          </Button>
          <Button href="/" width="full">
            Full Width Button
          </Button>
        </Flex>
      </section>

      <section id="homepageHero" className={styles.section}>
        <h2 className={cx(styles.sectionHeading, styles.container)}>Homepage Hero</h2>

        <HomepageHero />
      </section>

      <section id="cards" className={cx(styles.section, styles.container)}>
        <h2 className={styles.sectionHeading}>Card & Flex Components Test</h2>

        <Flex gap="l" align="stretch" className={styles.componentContainer}>
          <Card
            title="Getting Started Guide"
            description="This is a Card with a description and default size (m)"
            href="/"
            linkText="Go to guide"
            icon="documentation"
          />

          <Card
            title="Setting Your Security Policies Guide"
            description="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            href="/"
            linkText="Go to guide"
            icon="guide"
          />

          <Card
            title="Integrating your preferred package format with Cloudsmith"
            description="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            href="/"
            linkText="Go to documentation"
            icon="guide"
          />

          <Card
            title="Integrating your preferred package format with Cloudsmith"
            description="Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            href="/"
            linkText="Go to documentation"
            icon="guide"
          />
        </Flex>

        <h2 className={styles.sectionHeading}>Cards: Size variant (large)</h2>

        <Flex gap="l" align="stretch" className={styles.flexContainer}>
          <Card title="Dependencies" href="/" linkText="For Developers" icon="documentation" size="l" />

          <Card title="Deployment" href="/" linkText="For Operations" icon="guide" size="l" />

          <Card title="Distribution" href="/" linkText="For Vendors" icon="apiReference" size="l" />
        </Flex>

        <h2 className={styles.sectionHeading}>Cards: Width variants</h2>

        <h3 className={styles.subHeading}>Thirds</h3>

        <Flex gap="l" align="stretch" className={styles.flexContainer}>
          <Card
            title="Dependencies"
            href="/"
            linkText="For Developers"
            icon="documentation"
            size="l"
            width="third"
          />

          <Card title="Deployment" href="/" linkText="For Operations" icon="guide" size="l" width="third" />

          <Card
            title="Distribution"
            href="/"
            linkText="For Vendors"
            icon="apiReference"
            size="l"
            width="third"
          />
        </Flex>

        <h3 className={styles.subHeading}>Halves</h3>

        <Flex gap="l" align="stretch" className={styles.flexContainer}>
          <Card
            title="Dependencies"
            href="/"
            linkText="For Developers"
            icon="documentation"
            size="l"
            width="half"
          />

          <Card title="Deployment" href="/" linkText="For Operations" icon="guide" size="l" width="half" />
        </Flex>

        <h3 className={styles.subHeading}>Full</h3>

        <Flex gap="l" align="stretch" className={styles.flexContainer}>
          <Card
            title="This is a full width card"
            href="/"
            linkText="Go to documentation"
            icon="documentation"
            size="l"
            width="full"
          />
        </Flex>
      </section>

      <section id="images" className={cx(styles.section, styles.container)}>
        <h2 className={cx(styles.sectionHeading, styles.container)}>Images</h2>

        <BlockImage src={horizontalImage} alt="Image alternative text">
          This is a caption that I would like to show for the image
        </BlockImage>

        <BlockImage align="left" src={verticalImage} alt="Image alternative text">
          This is a caption that I would like to show for the image
        </BlockImage>

        <BlockImage align="right" src={verticalImage} alt="Image alternative text">
          This is a caption that I would like to show for the image
        </BlockImage>
      </section>
    </div>
  );
}
