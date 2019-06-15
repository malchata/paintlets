// Vendors
import { h, render } from "preact";

// App-specific
import "Components/reset.less";
import "Components/Home.less";
import PaintletList from "Components/PaintletList";

const Home = ({ worklets }) => (
  <section className="home">
    <hgroup>
      <h1>Paintlets!</h1>
      <h2>A fun gallery of configurable and downloadble paint worklets!</h2>
    </hgroup>
    <PaintletList worklets={worklets} />
  </section>
);

export default Home;
