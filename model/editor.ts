import { Page } from './page'
import { glider } from './store'

import ion4LineplanImagePath from '/images/ion4-lineplan-complete.png'

interface HoldTarget {
  pairSelect: string
  offset: number
}

export class Editor extends Page {
  dom: HTMLElement
  inp: HTMLInputElement
  loadie: HTMLElement
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  statorButton: HTMLElement

  image: HTMLImageElement

  holdTarget: HoldTarget
  pairSelect: string

  zValueOffset: number
  zValue: string

  keyDownEventBound: any

  constructor(dom: HTMLElement) {
    super(dom)

    this.inp = document.getElementById('inp') as HTMLInputElement
    this.loadie = document.getElementById('loadie')
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')

    this.image = new Image()
    this.pairSelect = 'a'
    this.zValue = ''
    this.zValueOffset = 0
    this.keyDownEventBound = this.keyDownEvent.bind(this)

    this.image.src = ion4LineplanImagePath

    this.bindEvents()
  }

  bindEvents() {
    this.image.onload = (e) => {
      const target = e.target as HTMLImageElement

      this.canvas.width = target.width
      this.canvas.height = target.height
    }

    this.loadie.onchange = (e) => {
      const target = e.target as HTMLInputElement
      const reader = new FileReader()

      reader.onload = (d) => {
        const k = d.target as FileReader
        const parsedResult = JSON.parse(k.result.toString())

        glider.load(parsedResult)
      }

      reader.readAsText(target.files[0])
    }

    this.inp.onchange = (e) => {
      const target = e.target as HTMLInputElement

      this.image.src = URL.createObjectURL(target.files[0])
    }

    this.canvas.onmousedown = (e) => {
      for (const [key, value] of Object.entries(glider.left)) {
        let holdTargetDistance: number

        for (let i = 0; i < value.length; i++) {
          const distance = Math.sqrt(
            (e.offsetX - value[i]['x']) ** 2 + (e.offsetY - value[i]['y']) ** 2
          )

          if (distance < 30) {
            if (distance < holdTargetDistance || !holdTargetDistance) {
              this.holdTarget = { pairSelect: key, offset: i }
              holdTargetDistance = distance
            }
          }
        }
      }

      if (this.holdTarget) {
        return
      }

      if (
        this.pairSelect === 'v' &&
        this.pairSelect in glider.left &&
        glider.left.v.length >= 2
      ) {
        return
      }

      glider.push(this.pairSelect, e.offsetX, e.offsetY)

      this.holdTarget = {
        pairSelect: this.pairSelect,
        offset: glider.left[this.pairSelect].length - 1,
      }
    }

    this.canvas.onmouseup = () => {
      delete this.holdTarget
    }

    this.canvas.onmousemove = (e) => {
      if (this.holdTarget) {
        glider.move(
          this.holdTarget.pairSelect,
          this.holdTarget.offset,
          e.offsetX,
          e.offsetY
        )
      }
    }
  }

  keyDownEvent(e) {
    if (e.key in glider.pairColors) {
      this.pairSelect = e.key
    } else if (e.key == 'Backspace') {
      if (this.pairSelect in glider.left) {
        glider.pop(this.pairSelect)
      }
    } else if (e.key == 'Enter') {
      let tempOffset = 0
      const zValueParsed = parseInt(this.zValue)

      for (const group of Object.values(glider.left)) {
        for (const point of Object.values(group)) {
          if (tempOffset == this.zValueOffset) {
            point['z'] = zValueParsed

            this.zValueOffset++
            this.zValue = ''

            return
          }

          tempOffset++
        }
      }
    } else {
      const maybeNumber = parseInt(e.key)

      if (!isNaN(maybeNumber)) {
        this.zValue += e.key

        console.log(this.zValue)
      }
    }
  }

  display(): void {
    super.display()
    document.body.addEventListener('keydown', this.keyDownEventBound, true)
  }

  hide(): void {
    super.hide()
    document.body.removeEventListener('keydown', this.keyDownEventBound, true)
  }

  chooseImage(): void {
    this.inp.click()
  }

  save(): void {
    const elem = window.document.createElement('a')
    const data = glider.getData()

    if (data === false) {
      alert('missing v?')

      return
    }

    const blob = new Blob([JSON.stringify(glider.getData(), null, 2)], {
      type: 'text/json',
    })

    elem.href = window.URL.createObjectURL(blob)
    elem.download = 'line-spacing.json'

    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }

  load(): void {
    this.loadie.click()
  }

  render(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.drawImage(this.image, 0, 0)

    this.context.strokeText(this.zValue, 0, 10)

    for (const [key, value] of Object.entries(glider.left)) {
      this.context.fillStyle = glider.pairColors[key]

      for (let i = 0; i < value.length; i++) {
        this.context.beginPath()
        this.context.arc(value[i]['x'], value[i]['y'], 5, 0, 2 * Math.PI)
        this.context.fill()
        this.context.stroke()

        this.context.strokeText(key + (i + 1), value[i]['x'], value[i]['y'] + 15)

        if (value[i]['z']) {
          this.context.strokeText(value[i]['z'], value[i]['x'], value[i]['y'] - 10)
        }
      }
    }

    for (const [key, value] of Object.entries(glider.right)) {
      this.context.fillStyle = glider.pairColors[key]

      for (let i = 0; i < value.length; i++) {
        this.context.beginPath()
        this.context.arc(value[i]['x'], value[i]['y'], 5, 0, 2 * Math.PI)
        this.context.fill()
        this.context.stroke()

        this.context.strokeText(key + (i + 1), value[i]['x'], value[i]['y'] + 15)
      }
    }
  }

  update(): void {
    this.canvas.focus()
  }
}
