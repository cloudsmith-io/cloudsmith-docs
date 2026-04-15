import type { Hero } from '@/lib/types';

import { cx } from 'class-variance-authority';

import { BackgroundGrid } from '../BackgroundGrid';
import { Button } from '../Button';
import { Container } from '../Container';
import { Flex } from '../Flex';
import { SearchDialog } from '../SearchDialog';
import styles from './HomepageHero.module.css';

type HeroProps = Partial<Hero>;

export function HomepageHero({
  title = 'This is the Hero Title',
  description = 'This is the Hero Description. It can be as long as you want.',
  buttons = [],
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
              {buttons.length > 0 && (
                <div className={styles.buttonContainer}>
                  {buttons.map((button) => (
                    <Button
                      key={button.href}
                      href={button.href}
                      icon={button.icon}
                      variant="secondary"
                      colorScheme="light"
                      className={styles.button}>
                      {button.label}
                    </Button>
                  ))}
                </div>
              )}
              <div className={styles.search}>
                <SearchDialog triggerTheme="dark" dialogTheme="light" enableKeyboardShortcut={false} />
              </div>
            </Flex>
          </Container>
        </Flex>
      </BackgroundGrid>
    </div>
  );
}
