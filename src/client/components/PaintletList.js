// Vendors
import { h, render } from "preact";

// App-specific
import "Components/PaintletList.less";
import Paintlet from "Components/Paintlet";

const PaintletList = ({ worklets }) => (
  <ul className="paintlet-list">
    {Object.keys(worklets).map((workletName, index) => <Paintlet key={index} workletName={workletName} customProperties={worklets[workletName]} />)}
  </ul>
);

export default PaintletList;
