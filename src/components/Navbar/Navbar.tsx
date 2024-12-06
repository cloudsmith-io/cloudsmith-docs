import { Container } from '../Container';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.root}>
      <Container>
        <nav className={styles.nav}>This will be the navbar</nav>
      </Container>
    </div>
  );
};

export default Navbar;
