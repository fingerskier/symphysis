class StylizedDropdown extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Create container for the dropdown
    const container = document.createElement('div');
    container.classList.add('dropdown-container');

    // Create and attach styles
    const style = document.createElement('style');
    style.textContent = `
      .dropdown-container {
        position: relative;
        display: inline-block;
        font-family: sans-serif;
      }
      .dropdown-button {
        padding: 8px 12px;
        cursor: pointer;
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 4px;
      }
      .dropdown-options {
        display: none;
        position: absolute;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 4px;
        min-width: 100%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.15);
        z-index: 1000;
      }
      .dropdown-options.show {
        display: block;
      }
    `;

    // Create the dropdown button
    const button = document.createElement('button');
    button.classList.add('dropdown-button');
    button.textContent = 'Select an option';

    // Create the container for options and add a slot for custom option elements
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('dropdown-options');
    const slot = document.createElement('slot');
    optionsContainer.appendChild(slot);

    // Append elements to the container and shadow DOM
    container.appendChild(button);
    container.appendChild(optionsContainer);
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Toggle options visibility on button click
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      optionsContainer.classList.toggle('show');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', () => {
      optionsContainer.classList.remove('show');
    });
  }
}

customElements.define('stylized-dropdown', StylizedDropdown);
