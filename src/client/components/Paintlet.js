// Vendors
import { h, render, Component } from "preact";

// App-specific
import "Components/Paintlet.css";
import CustomProperty from "Components/CustomProperty";

class Paintlet extends Component {
  constructor (props) {
    super(props);

    this.state = {
      customProperties: props.customProperties,
      paintletStyles: {
        backgroundImage: `paint(${props.workletName})`
      }
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

  updateCustomProperty (customPropertyName, value) {
    const customPropertyKey = `--${this.props.workletName}-${customPropertyName}`;
    let customProperties = { ...this.state.customProperties };
    let paintletStyles = { ...this.state.paintletStyles };

    customProperties[customPropertyName].value = value;
    paintletStyles[customPropertyKey] = value;

    this.setState({
      customProperties,
      paintletStyles
    });
  }

  render () {
    return (
      <li className={`paintlet ${this.props.workletName}`}>
        <style>{`
          .paintlet.${this.props.workletName} > .preview {
            background: paint(${this.props.workletName});
            ${Object.keys(this.state.customProperties).map(customPropertyName => {
              return `--${this.props.workletName}-${customPropertyName}: ${this.state.customProperties[customPropertyName].value}`
            }).join(";")}
          }
        `}</style>
        <h2>{this.props.workletName}</h2>
        <section className="preview">
        </section>
        <section className="custom-properties">
          {Object.keys(this.state.customProperties).map(customPropertyName => {
            const customProperty = this.state.customProperties[customPropertyName];

            return (
              <CustomProperty
                onCustomPropertyChange={this.updateCustomProperty}
                key={customPropertyName}
                id={`${this.props.workletName}-${customPropertyName}`}
                name={customPropertyName}
                syntax={customProperty.syntax}
                value={customProperty.value}
              />
            );
          })}
        </section>
      </li>
    );
  }
}

export default Paintlet;
