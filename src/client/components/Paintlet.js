// Vendors
import { h, render, Component } from "preact";

// App-specific
import "Styles/Paintlet.less";
import CustomProperty from "Components/CustomProperty";

class Paintlet extends Component {
  constructor (props) {
    super(props);

    const { customProperties, backgroundColor } = props;

    this.state = {
      customProperties,
      paintAPISupported: true,
      loading: true,
      error: false,
      fullscreen: false,
      backgroundColor
    };

    this.updateCustomProperty = this.updateCustomProperty.bind(this);
    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);

    if (typeof window !== "undefined" && props.lazy) {
      this.paintletObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.intersectionRatio) {
            this.registerPaintlet();
            observer.unobserve(entry.target);
            this.paintletObserver.disconnect();
          }
        });
      });
    }
  }

  componentDidMount () {
    this.paintletPreview.style.backgroundColor = this.state.backgroundColor;

    if (this.props.lazy) {
      this.paintletObserver.observe(this.paintletRoot);
    } else {
      this.registerPaintlet();
    }
  }

  registerPaintlet () {
    if (window.CSS.registerProperty) {
      Object.keys(this.props.customProperties).forEach(customPropertyName => {
        const { syntax, value } = this.props.customProperties[customPropertyName];
        const name = `--${this.props.workletName}-${customPropertyName}`;

        CSS.registerProperty({
          name,
          syntax,
          inherits: false,
          initialValue: value
        });
      });
    }

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
    this.setState({
      backgroundColor: this.backgroundColorInput.value
    }, () => {
      this.paintletPreview.style.backgroundColor = this.state.backgroundColor;
    });
  }

  toggleFullscreen () {
    this.setState({
      fullscreen: !this.state.fullscreen
    }, () => {
      document.body.style.overflow = this.state.fullscreen ? "hidden" : "auto";
    });
  }

  render () {
    const { author, workletName } = this.props;
    const { loading, error, paintAPISupported, backgroundColor, customProperties, fullscreen } = this.state;
    const backgroundColorFieldName = `paintlet-background-color-${workletName}`;
    const paintletClassNames = ["preview"];

    if (!paintAPISupported) {
      paintletClassNames.push("state-no-support");
    }

    if (loading) {
      paintletClassNames.push("state-loading");
    }

    if (error) {
      paintletClassNames.push("state-error");
    }

    if (fullscreen) {
      paintletClassNames.push("state-fullscreen");
    }

    return (
      <li className="paintlet" ref={paintletRoot => this.paintletRoot = paintletRoot}>
        <h3>
          <a href={`https://github.com/malchata/paintlets/blob/master/src/client/worklets/${workletName}.js`} rel="noopener">{workletName}</a> by <a href={author.website} rel="noopener">{author.screenName}</a>
        </h3>
        <section className={paintletClassNames.join(" ")} ref={paintletPreview => this.paintletPreview = paintletPreview}>
          <button className="fullscreen-toggle" onClick={this.toggleFullscreen}>{`${fullscreen ? "exit" : "view"} fullscreen`}</button>
          <p className="message-no-support">😖&nbsp;Paint API not supported</p>
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
        <fieldset className="properties">
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
        </fieldset>
      </li>
    );
  }
}

export default Paintlet;
