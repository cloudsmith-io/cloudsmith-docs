import { cx } from 'class-variance-authority';

import { BackgroundGrid } from '../BackgroundGrid';
import { Container } from '../Container';
import { Flex } from '../Flex';
import { SearchDialog } from '../SearchDialog';
import styles from './HomepageHero.module.css';

interface HeroProps {
  title?: string;
  description?: string;
}

export function HomepageHero({
  title = 'This is the Hero Title',
  description = 'This is the Hero Description. It can be as long as you want.',
}: HeroProps) {
  const hasHTML = /<[^>]+>/.test(title);

  return (
    <div className={styles.wrapper}>
      <BackgroundGrid className={styles.backgroundGrid}>
        <Flex direction="column" align="center" className={styles.root}>
          <Container className={styles.container}>
            <Flex direction="column" align="center" justify="center" className={styles.content}>
              {hasHTML ? (
                <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
              ) : (
                <h2 className={styles.title}>{title}</h2>
              )}
              <p className={cx(styles.description, 'headlineS')}>{description}</p>
              <div className={styles.search}>
                <SearchDialog triggerTheme="dark" dialogTheme="light" />
              </div>
            </Flex>
          </Container>
        </Flex>
      </BackgroundGrid>
    </div>
  );
}
