import { Container, Card, Flex, BlockImage } from '@/components';
import horizontalImage from '@/content/images/horizontal.png';
import verticalImage from '@/content/images/vertical.png';

import styles from './page.module.css';

export default function DesignSystemPage() {
  return (
    <Container className={styles.root}>
      <h2>Cards</h2>

      <Flex gap="l" align="stretch" className={styles.flexContainer}>
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

      <h2>Cards: Size variant (large)</h2>

      <Flex gap="l" align="stretch" className={styles.flexContainer}>
        <Card title="Dependencies" href="/" linkText="For Developers" icon="documentation" size="l" />

        <Card title="Deployment" href="/" linkText="For Operations" icon="guide" size="l" />

        <Card title="Distribution" href="/" linkText="For Vendors" icon="apiReference" size="l" />
      </Flex>

      <h2>Cards: Width variants</h2>

      <h3>Thirds</h3>

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

      <h3>Halves</h3>

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

      <h3>Full</h3>

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

      <h2>Images</h2>

      <BlockImage src={horizontalImage} alt="Image alternative text">
        This is a caption that I would like to show for the image
      </BlockImage>

      <BlockImage align="left" src={verticalImage} alt="Image alternative text">
        This is a caption that I would like to show for the image
      </BlockImage>

      <BlockImage align="right" src={verticalImage} alt="Image alternative text">
        This is a caption that I would like to show for the image
      </BlockImage>
    </Container>
  );
}
