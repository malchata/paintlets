// Vendors
import { h, render, Component, Fragment } from "preact";

// App-specific
import "Styles/CustomProperty.less";

class CustomProperty extends Component {
  constructor (props) {
    super(props);

    this.onCustomPropertyChange = this.onCustomPropertyChange.bind(this);
  }

  onCustomPropertyChange () {
    this.props.onCustomPropertyChange(this.props.name, this.customPropertyInput.value);
  }

  render () {
    return (
      <>
        <label htmlFor={this.props.id}>{`${this.props.name}:`}</label>
        <input onChange={this.onCustomPropertyChange} ref={input => this.customPropertyInput = input} name={this.props.name} type="text" id={this.props.id} value={this.props.value} />
      </>
    );
  }
}

export default CustomProperty;
