import { Page } from './page'
import { factory } from './store'

export class Measure extends Page {
  constructor(dom: HTMLElement) {
    super(dom)
  }

  display() {
    super.display()
    let output = '<div style="display:block">'
    
    output += `<table class="c l">`

    //const headerCount = Object.keys(glider.left['a']).length
    const headerCount = Object.values(factory.left).map(d => d.length).reduce((a, b) => Math.max(a, b), 0);
    
    output += `<th></th>`
    let n = Array(headerCount)
    
    for(let i = 0; i < headerCount; i++) {
      n[i] = i + 1
    }

    n.reverse()

    output+= '<td>' + n.join('</td><td>') + '</td>'

    for (const [a, b] of Object.entries(factory.left)) {
      if(a === 'v') {
        continue
      }

      output += `<tr><td>${a}</td>`

      console.log(JSON.stringify(b))
      let bClone = JSON.parse(JSON.stringify(b))

      bClone.length = headerCount
      bClone.reverse()

      console.log(a, JSON.stringify(b))

      for(let i = 0; i < bClone.length; i++) {
        if(bClone[i] && 'x' in bClone[i]) {
          output += `<td><input type="text" value="${bClone[i]['z'] || ''}" /></td>`
        }
        else {
          output += `<td></td>`
        }
      }

      output += `</tr>`
    }

    output += `</table>`

    output += `<table class="c r">`
    

    n.reverse()

    output+= '<td>' + n.join('</td><td>') + '</td>'

    for (const [a, b] of Object.entries(factory.right)) {
      if(a === 'v') {
        continue
      }

      output += `<tr>`

      for(let i = 0; i < b.length; i++) {
        if(b[i] && 'x' in b[i]) {
          output += `<td><input type="text" value="${b[i]['z'] || ''}" /></td>`
        }
        else {
          output += `<td></td>`
        }
      }

      output += `</tr>`
    }

    output += `</table>`

    output += `</div>`

    this.dom.innerHTML = output
  }
}