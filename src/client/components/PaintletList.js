// Vendors
import { h, render } from "preact";

// App-specific
// import "./PaintletList.css";
import Paintlet from "./Paintlet.js";

const PaintletList = ({ worklets }) => {
  return (
    <ol className="paintlet-list">
      {Object.keys(worklets).map(workletName => <Paintlet key={workletName} name={workletName} properties={worklets[workletName]} />)}
    </ol>
  );
};

export default PaintletList;
