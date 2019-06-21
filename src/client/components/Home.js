// Vendors
import { h, render } from "preact";

// App-specific
import "Styles/reset.less";
import "Styles/Home.less";
import PaintletList from "Components/PaintletList";

const Home = ({ worklets }) => (
  <section className="home">
    <hgroup>
      <h1>Paintlets!</h1>
      <h2>A gallery of tweakable and downloadable paint worklets!</h2>
    </hgroup>
    <PaintletList worklets={worklets} />
  </section>
);

export default Home;
