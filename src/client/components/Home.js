// Vendors
import { h, render, Fragment } from "preact";

// App-specific
import "Styles/Base.less";
import "Styles/Home.less";
import PaintletList from "Components/PaintletList";
import Footer from "Components/Footer";

const Home = ({ worklets }) => (
  <section className="home">
    <hgroup>
      <h1>Paintlets!</h1>
      <h2>A gallery of tweakable and downloadable paint worklets!</h2>
    </hgroup>
    <PaintletList worklets={worklets} />
    <Footer />
  </section>
);

export default Home;
