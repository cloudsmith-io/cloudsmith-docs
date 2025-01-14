import { Card, Flex, HomepageHero } from '@/components';
import { HomepageContent } from '@/lib/types';
import styles from './page.module.css';
import content from '@/content/homepage.json';

export default function Page() {
  const typedContent = content as HomepageContent;

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'cards':
        return (
          <section key={index} className={styles.section}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            <Flex align="stretch" className={styles.cardContainer}>
              {section.cards.map((card: any, cardIndex: number) => (
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
          </section>
        );
      case 'divider':
        return (
          <div key={index} className={styles.divider} role="separator">
            <span></span>
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
