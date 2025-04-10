class Route extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM and project the content via a slot.
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<slot></slot>`;
    this._onHashChange = this.updateVisibility.bind(this);
  }
  
  
  connectedCallback() {
    this.updateVisibility();
    window.addEventListener("hashchange", this._onHashChange);
  }
  
  
  disconnectedCallback() {
    window.removeEventListener("hashchange", this._onHashChange);
  }
  
  
  static get observedAttributes() {
    return ['path'];
  }
  
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'path' && oldValue !== newValue) {
      this.updateVisibility();
    }
  }
  
  
  // Computes the full route by traversing up parent <route> elements.
  get fullPath() {
    const segments = [];
    let element = this;
    while (element) {
      if (element.nodeType === Node.ELEMENT_NODE &&
          element.tagName.toLowerCase() === "route") {
        const segment = element.getAttribute("path");
        if (segment) {
          segments.unshift(segment); // prepend parent's segment
        }
      }
      element = element.parentElement;
    }
    return segments;
  }
  
  
  updateVisibility() {
    // Use window.$.hash if available; otherwise, parse from location.hash.
    let hash = (window.$ && window.$.hash) || window.location.hash.replace(/^#/, '').split('/').filter(Boolean);
    const fullPath = this.fullPath;
    // Show content if the current hash starts with the full route.
    const isMatch = hash.length >= fullPath.length &&
                    fullPath.every((seg, idx) => hash[idx] === seg);
    this.style.display = isMatch ? '' : 'none';
  }
}

// Register the custom element.
customElements.define("sym-route", Route)