import { render } from "preact";

export default function (vnode, parent) {
  return render(vnode, parent, parent.firstElementChild);
}
