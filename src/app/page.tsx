import { Card, Flex, HomepageHero, Container } from '@/components';
import { HomepageContent, Section, Card as CardType } from '@/lib/types';
import styles from './page.module.css';
import content from '@/content/homepage.json';

export default function Page() {
  const typedContent = content as HomepageContent;

  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case 'cards':
        return (
          <Container key={index} className={styles.section} as="section">
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            <Flex align="stretch">
              {section.cards.map((card: CardType, cardIndex: number) => (
                <Card
                  key={cardIndex}
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  linkText={card.linkText}
                  icon={card.icon}
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
    <>
      {typedContent.hero && (
        <HomepageHero
          title={typedContent.hero.title}
          description={typedContent.hero.description}
          buttons={typedContent.hero.buttons}
        />
      )}

      {typedContent.sections?.map((section, index) => renderSection(section, index))}
    </>
  );
}
