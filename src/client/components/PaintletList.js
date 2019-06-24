// Vendors
import { h, render } from "preact";

// App-specific
import "Styles/PaintletList.less";
import Paintlet from "Components/Paintlet";

const PaintletList = ({ worklets }) => (
  <ul className="paintlet-list">
    {Object.keys(worklets).map((workletName, key) => {
      const lazy = key > 1;

      return <Paintlet lazy={lazy} key={key} workletName={workletName} customProperties={worklets[workletName].customProperties} author={worklets[workletName].author} />;
    })}
  </ul>
);

export default PaintletList;
