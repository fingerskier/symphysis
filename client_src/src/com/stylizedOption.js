class StylizedOption extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // Create container for the option
    const container = document.createElement('div');
    container.classList.add('option');

    // Apply basic styles for each option
    const style = document.createElement('style');
    style.textContent = `
      .option {
        padding: 8px 12px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: background 0.2s ease;
      }
      .option:hover {
        background-color: #f1f1f1;
      }
      :host(:last-child) .option {
        border-bottom: none;
      }
    `;

    // Use the element’s text content as the option label
    container.textContent = this.textContent;

    // Append style and container to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Listen for click events on the option
    container.addEventListener('click', () => {
      // Find the closest dropdown parent
      const dropdown = this.closest('stylized-dropdown');
      if (dropdown) {
        // Update the dropdown button text with the selected option text
        const button = dropdown.shadowRoot.querySelector('.dropdown-button');
        if (button) {
          button.textContent = this.textContent;
        }
        // Close the options list
        const optionsContainer = dropdown.shadowRoot.querySelector('.dropdown-options');
        optionsContainer.classList.remove('show');
      }
    });
  }
}

customElements.define('stylized-option', StylizedOption)