import { cx } from 'class-variance-authority';

import { Card, Container, Flex, HomepageHero } from '@/components';
import content from '@/content/homepage.json';
import { Card as CardType, HomepageContent, Section } from '@/lib/types';

import styles from './page.module.css';

export default function Page() {
  const typedContent = content as HomepageContent;

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'cards':
        return (
          <Container key={index} className={styles.section} as="section">
            <h2 className={cx(styles.sectionHeading, 'headlineS')}>{section.heading}</h2>
            <Flex align="stretch">
              {section.cards.map((card: CardType, cardIndex: number) => (
                <Card
                  key={cardIndex}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  linkText={card.linkText}
                  icon={card.icon}
                  size={card.size}
                  width={card.width}
                  type={card.type}
                />
              ))}
            </Flex>
          </Container>
        );
      case 'divider':
        return (
          <div key={index} className={styles.divider} role="separator">
            <span className={styles.dividerLine}></span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.main}>
      {typedContent.hero && (
        <HomepageHero
          title={typedContent.hero.title}
          description={typedContent.hero.description}
          buttons={typedContent.hero.buttons}
        />
      )}

      {typedContent.sections?.map((section, index) => renderSection(section, index))}
    </main>
  );
}
