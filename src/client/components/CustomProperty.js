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
    const { id, name, value, disabled } = this.props;

    return (
      <>
        <label htmlFor={id}>{`--${id}:`}</label>
        <input
          onChange={this.onCustomPropertyChange}
          ref={customPropertyInput => this.customPropertyInput = customPropertyInput}
          name={name}
          type="text"
          id={id}
          value={value}
          disabled={disabled}
        />
      </>
    );
  }
}

export default CustomProperty;
