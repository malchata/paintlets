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
      paintAPISupported: true,
      loading: true,
      error: false,
      backgroundColor: "#fffbfe"
    };

    this.updateCustomProperty = this.updateCustomProperty.bind(this);
    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);

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

    if ("requestIdleCallback" in window) {
      requestIdleCallback(this.addPaintWorklet);
    } else {
      this.addPaintWorklet();
    }
  }

  addPaintWorklet () {
    if (window.CSS.paintWorklet) {
      CSS.paintWorklet.addModule(`/worklets/${this.props.workletName}.js`).then(() => {
        this.paintletPreview.style.backgroundImage = `paint(${this.props.workletName})`;

        this.setState({
          loading: false
        });
      }).catch(() => {
        this.setState({
          loading: false,
          error: true
        });
      });
    } else {
      this.setState({
        paintAPISupported: false,
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

  updateBackgroundColor () {
    console.dir(this.backgroundColorInput);

    this.setState({
      backgroundColor: this.backgroundColorInput.value
    }, () => {
      this.paintletPreview.style.backgroundColor = this.state.backgroundColor;
    });
  }

  render () {
    const { author, workletName } = this.props;
    const { loading, error, paintAPISupported, backgroundColor, customProperties } = this.state;
    const backgroundColorFieldName = `paintlet-background-color-${workletName}`;

    return (
      <li className="paintlet" ref={paintletRoot => this.paintletRoot = paintletRoot}>
        <h3>
          <a href={`https://github.com/malchata/paintlets/blob/master/src/client/worklets/${workletName}.js`} rel="noopener">{workletName}</a> by <a href={author.website} rel="noopener">{author.screenName}</a>
        </h3>
        <section className={`preview ${paintAPISupported ? "" : "state-no-support"} ${loading ? "state-loading" : ""} ${error ? "state-error": ""}`} ref={paintletPreview => this.paintletPreview = paintletPreview}>
          <p className="message-no-support">😫&nbsp;Paint API not supported</p>
          <p className="message-loading">⏳&nbsp;Loading paintlet...</p>
          <p className="message-error">🐜&nbsp;Arrrgh! There was a bug!</p>
          <fieldset className="controls">
            <label htmlFor={backgroundColorFieldName}>background-color:</label>
            <input
              type="text"
              onChange={this.updateBackgroundColor}
              ref={backgroundColorInput => this.backgroundColorInput = backgroundColorInput}
              value={backgroundColor}
              id={backgroundColorFieldName}
              name={backgroundColorFieldName}
              disabled={error || loading || !paintAPISupported}
            />
          </fieldset>
        </section>
        <section className="properties">
          {Object.keys(customProperties).map((customPropertyName, key) => {
            const { syntax, value } = customProperties[customPropertyName];

            return (
              <CustomProperty
                onCustomPropertyChange={this.updateCustomProperty}
                key={key}
                id={`${workletName}-${customPropertyName}`}
                name={customPropertyName}
                syntax={syntax}
                value={value}
                disabled={error || loading || !paintAPISupported}
              />
            );
          })}
        </section>
      </li>
    );
  }
}

export default Paintlet;
