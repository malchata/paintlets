import { h, hydrate } from "preact";
import Home from "Components/Home";
import worklets from "../../server/worklets";

hydrate(<Home path="/" worklets={worklets} />, document.getElementById("app"));
