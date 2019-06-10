// Vendors
import { h, render } from "preact";

// App-specific
import "Components/PaintletList.css";
import Paintlet from "Components/Paintlet";

const PaintletList = ({ worklets }) => (
  <ol className="paintlet-list">
    {Object.keys(worklets).map(workletName => <Paintlet key={workletName} workletName={workletName} customProperties={worklets[workletName]} />)}
  </ol>
);

export default PaintletList;
