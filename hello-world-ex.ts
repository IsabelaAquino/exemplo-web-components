// hello-world.ts

export class HelloWorld extends HTMLElement {
    private templateContent: DocumentFragment;
    constructor() {
      super();

      // Obtém o conteúdo do template
      const template = document.getElementById('hello-world-template') as HTMLTemplateElement;
      this.templateContent = document.importNode(template.content, true);

      // Cria um shadow DOM e anexa o conteúdo do template
      this.attachShadow({ mode: 'open' });
      this.shadowRoot?.appendChild(this.templateContent);

      // Adiciona um observador de atributos para reagir a mudanças no atributo 'name'
      this.observeAttributes();
    }
  
    // Método chamado quando o elemento é conectado ao DOM
    connectedCallback() {
      this.updateContent();
    }
  
    // Método chamado quando um atributo monitorado é alterado
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (name === 'name' && oldValue !== newValue) {
        this.updateContent();
      }
    }
  
    // Observa mudanças no atributo 'name'
    observeAttributes() {
      const config = { attributes: true, attributeOldValue: true };
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          this.attributeChangedCallback(
            mutation.attributeName!,
            mutation.oldValue,
            this.getAttribute(mutation.attributeName!)
          );
        });
      });
  
      observer.observe(this, config);
    }
  
    // Atualiza o conteúdo do elemento com base no atributo 'name'
    updateContent() {
      const name = this.getAttribute('name') || 'Guest';
      this.shadowRoot!.getElementById('name')!.textContent = name;
    }
  }
  
  // Exporta a classe
  export default HelloWorld;
  
  // Registra o custom element
  customElements.define('hello-world', HelloWorld);
  