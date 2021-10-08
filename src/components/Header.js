import freeworldLogo from "../images/freeworld_monogram_white.svg";

import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={freeworldLogo} alt="Free World" />
      <span className={styles.title}>FreeWorld Calculator</span>
    </div>
  );
};

export default Header;
