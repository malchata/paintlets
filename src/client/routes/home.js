import { h, render } from "preact";
import hydrate from "../helpers/hydrate";
import Home from "Components/Home";
import worklets from "../../server/worklets";

hydrate(<Home path="/" worklets={worklets} />, document.getElementById("app"));
