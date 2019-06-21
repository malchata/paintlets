// Vendors
import { h, render, Component } from "preact";

// App-specific
import "Styles/Paintlet.less";
import CustomProperty from "Components/CustomProperty";

class Paintlet extends Component {
  constructor (props) {
    super(props);

    this.state = {
      customProperties: props.customProperties
    };

    this.updateCustomProperty = this.updateCustomProperty.bind(this);
  }

  componentDidMount () {
    if (window.CSS.registerProperty) {
      Object.keys(this.props.customProperties).forEach(customPropertyName => {
        const customProperty = this.props.customProperties[customPropertyName];
        const customPropertyKey = `--${this.props.workletName}-${customPropertyName}`;

        CSS.registerProperty({
          name: customPropertyKey,
          syntax: `<${customProperty.syntax}>`,
          inherits: false,
          initialValue: customProperty.value
        });
      });
    }

    if (window.CSS.paintWorklet) {
      CSS.paintWorklet.addModule(`/worklets/${this.props.workletName}.js`);
    }
  }

  updateCustomProperty (customPropertyName, customPropertyValue) {
    let customProperties = { ...this.state.customProperties };
    customProperties[customPropertyName].value = customPropertyValue;

    this.setState({
      customProperties
    });
  }

  customPropertiesToStyles () {
    return Object.keys(this.state.customProperties).map(customPropertyName => `--${this.props.workletName}-${customPropertyName}: ${this.state.customProperties[customPropertyName].value}`).join(";");
  }

  render () {
    return (
      <li className={`paintlet ${this.props.workletName}`}>
        <style>{`
          .paintlet.${this.props.workletName} > .preview {
            background-image: paint(${this.props.workletName});
            ${this.customPropertiesToStyles()}
          }
        `}</style>
        <section className="preview">
        </section>
        <section className="info">
          <h3>{this.props.workletName}</h3>
        </section>
        <section className="properties">
          {Object.keys(this.state.customProperties).map(customPropertyName => {
            const { syntax, value } = this.state.customProperties[customPropertyName];

            return (
              <CustomProperty
                onCustomPropertyChange={this.updateCustomProperty}
                key={customPropertyName}
                id={`${this.props.workletName}-${customPropertyName}`}
                name={customPropertyName}
                syntax={syntax}
                value={value}
              />
            );
          })}
        </section>
      </li>
    );
  }
}

export default Paintlet;
