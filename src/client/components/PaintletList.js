// Vendors
import { h, render } from "preact";

// App-specific
import PaintletListStyles from "Components/PaintletList.css";
import Paintlet from "Components/Paintlet";

const PaintletList = ({ worklets }) => {
  return (
    <ol className="paintlet-list">
      {Object.keys(worklets).map(workletName => <Paintlet key={workletName} name={workletName} properties={worklets[workletName]} />)}
    </ol>
  );
};

export default PaintletList;
