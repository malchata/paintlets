import { h, render } from "preact";
import Router from "preact-router";
import PaintletList from "Components/PaintletList";
import worklets from "../../server/worklets";

render(<Router>
  <PaintletList path="/" worklets={worklets} default />
</Router>, document.querySelector("main"), document.querySelector("main > div"));
