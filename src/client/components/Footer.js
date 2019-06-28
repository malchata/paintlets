// Vendors
import { h, render } from "preact";

// App-specific
import "Styles/Footer.less";

const Footer = () => (
  <footer>
    <p>
      Made with 💖 by <a href="https://jeremy.codes/" rel="noopener">malchata</a><br />
      <a href="https://github.com/malchata/paintlets" rel="noopener">Add your paint worklets to this gallery on Github</a>.
    </p>
  </footer>
);

export default Footer;
