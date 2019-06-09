import { h, render } from "preact";
import Router from "preact-router";
import PaintletList from "../components/PaintletList.js";
import worklets from "../../server/worklets.js";

render(<Router>
  <PaintletList path="/" worklets={worklets} default />
</Router>, document.querySelector("main"), document.querySelector("main > div"));
