export class Page {
  dom: HTMLElement

  constructor(dom: HTMLElement) {
    this.dom = dom
  }

  hide() {
    this.dom.style.display = "none"
  }

  display() {
    this.dom.style.display = "block"
  }

  update() {
    // empty
  }

  render() {
    // empty
  }
}
