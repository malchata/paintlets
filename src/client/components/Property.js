// Vendors
import { h, render, Component } from "preact";

// App-specific
// import "./Property.css";

class Property extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.initialValue
    };
  }

  render () {
    return (
      <fieldset className="property">
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <input name={this.props.name} type="text" id={this.props.id} value={this.state.value} />
      </fieldset>
    );
  }
}

export default Property;
