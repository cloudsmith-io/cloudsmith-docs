import { Container } from '@/components/Container';
import { Link } from '@/components/Link';
import { Icon } from '@/icons';

import styles from './Footer.module.css';

const navigationLinks = [
  { href: '/documentation', label: 'Docs' },
  { href: '/guides', label: 'Guides' },
  { href: '/api', label: 'API Reference' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.root}>
      <Container className={styles.container}>
        <p className={`${styles.credit} bodyS`}>
          <span>Made with</span>
          <Icon name="heart" className={styles.heart} aria-hidden="true" focusable="false" title="" />
          <span>by Cloudsmith © {year}</span>
        </p>

        <nav className={styles.nav} aria-label="Footer navigation">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`${styles.link} bodyS`}>
              {link.label}
            </Link>
          ))}

          <span className={`${styles.legalGroup} bodyS`}>
            <Link href="https://cloudsmith.com/terms-conditions" className={styles.link}>
              Terms
            </Link>
            <span aria-hidden="true">&amp;</span>
            <Link href="https://cloudsmith.com/privacy-policy" className={styles.link}>
              Privacy
            </Link>
          </span>

          <Link href="https://cloudsmith.com/company/contact-us" className={`${styles.link} bodyS`}>
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
