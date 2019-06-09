// Vendors
import { h, render, Component } from "preact";

// App-specific
// import "./Paintlet.css";
import Property from "./Property.js";

class Paintlet extends Component {
  constructor (props) {
    super(props);

    this.state = {
      properties: this.props.properties
    };
  }

  componentDidMount () {
    if (window.CSS.registerProperty) {
      this.props.properties.forEach(property => {
        const [ name, syntax, initialValue ] = property;

        CSS.registerProperty({
          name: `--${name}-tile-size`,
          syntax: `<${syntax}>`,
          inherits: true,
          initialValue
        });
      });
    }

    if (window.CSS.paintWorklet) {
      CSS.paintWorklet.addModule(`/worklets/${this.props.name}.js`);
    }
  }

  handlePropertyChange () {

  }

  render () {
    return (
      <li className="paintlet">
        <h2>{this.props.name}</h2>
        <section className="preview">
        </section>
        <section className="properties">
          {this.state.properties.map((property, index) => {
            const [ name, syntax, initialValue ] = property;

            return (<Property onBlur={this.handlePropertyChange} key={index} id={`${this.props.name}-${property[0]}`} name={name} syntax={syntax} initialValue={initialValue} />);
          })}
        </section>
      </li>
    );
  }
}

export default Paintlet;
