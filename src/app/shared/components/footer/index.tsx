import React, { ReactElement } from "react";
import styles from "./footer.module.scss";

const Footer = (): ReactElement => {
  return (
    <div className={styles.footer}>
    <footer>
  <section className="ft-legal">
    <ul className="ft-legal-list">
      <li><a href="#">Terms &amp; Conditions</a></li>
      <li><a href="#">Privacy Policy</a></li>
      <li>&copy; 2022 Stringblock, LLC</li>
    </ul>
  </section>
</footer>
     
    </div>
  );
};

export default Footer;
