// components.js - A simple pseudo-core for constructing and managing components

// Define a base Component class
class Component {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }
  // Render the component as HTML (this can be extended with templating)
  render() {
    return `<div id="${this.id}">${JSON.stringify(this.data)}</div>`;
  }
}

// A simple registry for components
const componentRegistry = {};

// Function to register a new component
function registerComponent(id, component) {
  componentRegistry[id] = component;
}

// Function to retrieve a registered component
function getComponent(id) {
  return componentRegistry[id];
}

// Example: create and register a standard component
const standardComponent = new Component('standard1', { message: "Hello, world!" });
registerComponent(standardComponent.id, standardComponent);

// Expose the component registry globally for further use
window.componentRegistry = componentRegistry;
