// Vendors
import { h, render } from "preact";

// App-specific
import "Styles/PaintletList.less";
import Paintlet from "Components/Paintlet";

const PaintletList = ({ worklets }) => (
  <ul className="paintlet-list">
    {Object.keys(worklets).map((workletName, key) => <Paintlet lazy={key > 0} key={key} workletName={workletName} customProperties={worklets[workletName].customProperties} author={worklets[workletName].author} />)}
  </ul>
);

export default PaintletList;
