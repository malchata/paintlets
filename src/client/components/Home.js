// Vendors
import { h, render } from "preact";

// App-specific
import "Components/reset.css";
import "Components/Home.css";
import PaintletList from "Components/PaintletList";
import worklets from "../../server/worklets";

const Home = () => (
  <section className="home">
    <hgroup>
      <h1>Paintlets!</h1>
      <h2>A fun gallery of configurable and downloadble paint worklets!</h2>
    </hgroup>
    <PaintletList worklets={worklets} />
  </section>
);

export default Home;
