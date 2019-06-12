import { h, render } from "preact";
import Router from "preact-router";
import Home from "Components/Home";

render(<Router>
  <Home path="/" default />
</Router>, document.querySelector("#app"), document.querySelector("#app > div"));
