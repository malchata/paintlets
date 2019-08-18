// Vendors
import { h, render } from "preact";

// App-specific
import "Styles/PaintletList.less";
import Paintlet from "Components/Paintlet";

const PaintletList = ({ worklets }) => {
  let lazyKey = 1;

  if (typeof window !== "undefined") {
    if (window.innerWidth > 799 || window.innerHeight > 1279) {
      lazyKey = 2;
    }

    if (window.innerWidth > 1439 || window.innerHeight > 1279) {
      lazyKey = 3;
    }
  }

  return (
    <ul className="paintlet-list">
      {Object.keys(worklets).map((workletName, key) => <Paintlet lazy={key > lazyKey} key={key} workletName={workletName} customProperties={worklets[workletName].customProperties} backgroundColor={worklets[workletName].backgroundColor} author={worklets[workletName].author} />)}
    </ul>
  );
};

export default PaintletList;
