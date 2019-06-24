// Vendors
import { h, render, Component } from "preact";

// App-specific
import "Styles/Paintlet.less";
import CustomProperty from "Components/CustomProperty";

class Paintlet extends Component {
  constructor (props) {
    super(props);

    this.state = {
      customProperties: props.customProperties,
      paintAPISupport: true,
      loading: true
    };

    this.updateCustomProperty = this.updateCustomProperty.bind(this);

    if (typeof window !== "undefined" && this.props.lazy) {
      this.paintletObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio) {
            this.registerPaintlet();
            observer.unobserve(entry.target);
            this.paintletObserver.disconnect();
          }
        });
      });
    }
  }

  componentDidMount () {
    if (this.props.lazy) {
      this.paintletObserver.observe(this.paintletRoot);
    } else {
      this.registerPaintlet();
    }
  }

  registerPaintlet () {
    if (window.CSS.registerProperty) {
      Object.keys(this.props.customProperties).forEach(customPropertyName => {
        const customProperty = this.props.customProperties[customPropertyName];
        const customPropertyKey = `--${this.props.workletName}-${customPropertyName}`;

        CSS.registerProperty({
          name: customPropertyKey,
          syntax: `${customProperty.syntax}`,
          inherits: false,
          initialValue: customProperty.value
        });
      });
    }

    if (window.CSS.paintWorklet) {
      requestIdleCallback(() => {
        CSS.paintWorklet.addModule(`/worklets/${this.props.workletName}.js`).then(() => {
          this.paintletPreview.style.backgroundImage = `paint(${this.props.workletName})`;

          this.setState({
            loading: false
          });
        });
      });
    } else {
      this.setState({
        paintAPISupport: false,
        loading: false
      });
    }
  }

  updateCustomProperty (customPropertyName, customPropertyValue) {
    let customProperties = { ...this.state.customProperties };
    customProperties[customPropertyName].value = customPropertyValue;

    this.setState({
      customProperties
    }, () => {
      Object.keys(this.state.customProperties).map(customPropertyName => {
        this.paintletPreview.style.setProperty(`--${this.props.workletName}-${customPropertyName}`, this.state.customProperties[customPropertyName].value);
      });
    });
  }

  render () {
    return (
      <li className="paintlet" ref={paintletRoot => this.paintletRoot = paintletRoot}>
        <section className={`preview ${this.state.paintAPISupport ? "" : "state-no-support"} ${this.state.loading ? "state-loading" : ""}`} ref={paintletPreview => this.paintletPreview = paintletPreview}>
          <p className="message-no-support">😫&nbsp;Paint API not supported</p>
          <p className="message-loading">⏳&nbsp;Loading paintlet...</p>
        </section>
        <section className="info">
          <h3>
            <a href={`https://github.com/malchata/paintlets/blob/master/src/client/worklets/${this.props.workletName}.js`} rel="noopener">{this.props.workletName}</a>
          </h3>
          <p>
            by&nbsp;<a href={this.props.author.website} rel="noopener">{this.props.author.screenName}</a>
          </p>
        </section>
        <section className="properties">
          {Object.keys(this.state.customProperties).map((customPropertyName, key) => {
            const { syntax, value } = this.state.customProperties[customPropertyName];

            return (
              <CustomProperty
                onCustomPropertyChange={this.updateCustomProperty}
                key={key}
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
