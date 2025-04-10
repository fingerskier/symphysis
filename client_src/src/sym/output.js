class SymOutput extends HTMLElement {
  constructor() {
    super();
    // Create a shadow DOM for encapsulated styling and markup.
    this.attachShadow({ mode: 'open' });
  }

  // Observe the "name" attribute so we know when it changes.
  static get observedAttributes() {
    return ['name'];
  }

  // Called when an observed attribute changes.
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'name' && oldVal !== newVal) {
      this.render();
    }
  }

  // Called when the element is added to the DOM.
  connectedCallback() {
    this.render();
  }

  render() {
    // Get the attribute value (e.g., "flarn") and look up $.flarn.
    const key = this.getAttribute('name');
    let value;
    if (window.$ && typeof window.$ === 'object') {
      value = window.$[key];
    } else {
      value = undefined;
    }

    let output = '';

    // Determine the type of the value and display accordingly.
    if (value === undefined) {
      output = '';
    } else if (value === null) {
      output = 'null';
    } else if (typeof value === 'object') {
      // Pretty-print objects.
      try {
        output = JSON.stringify(value, null, 2);
      } catch (err) {
        output = String(value);
      }
    } else {
      // For numbers, strings, booleans, etc.
      output = String(value);
    }

    // Render the output with minimal styling.
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: monospace;
          white-space: pre-wrap;
        }
      </style>
      <span>${output}</span>
    `;
  }
}

// Define the custom element.
customElements.define('sym-output', SymOutput)