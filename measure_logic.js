import './style.css'

const s = document.getElementById('select')
const oe = document.getElementById('output')
const o = {}
const stepLimit = 12
const mapping = ['a', 'b', 'c', 'd', 'k']

let inputBuffer = ''
let target = { x: 'a', y: 1, z: 'left' }

const update = () => {
  s.innerText = inputBuffer

  oe.innerText = JSON.stringify(target, null, 2)
  oe.innerText += '\n' + JSON.stringify(o, null, 2)

  window.requestAnimationFrame(update)
}

document.body.addEventListener('keydown', (e) => {
  const keyNumber = Number(e.key)
  const key = e.key
  const mapIndex = mapping.indexOf(target.x)

  switch (e.key) {
    case 'Enter':
      const inputBufferParse = inputBuffer.match(/([a-z])([0-9]+)?/)
      const inputValue = Number(inputBuffer)

      if (inputBufferParse) {
        target.x = inputBufferParse[1]
        target.y = Number(inputBufferParse[2]) || 1
        console.log(inputBufferParse)
      } else if (inputValue > stepLimit) {
        if (!(target.x in o[target.z])) {
          o[target.z][target.x] = []
        }

        o[target.z][target.x][target.y - 1] = inputValue
        target.y++
      } else {
        target.y = inputValue
      }

      inputBuffer = ''

      break
    case 'Backspace':
      if (inputBuffer.length) {
        inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1)
      } else if (o[target.z][target.x].length) {
        o[target.z][target.x].splice(target.y - 1, 1)

        if (target.y - 1) {
          target.y--
        }
        console.log(o[target.z][target.x])
      }
      break
    case 'ArrowLeft':
      if (target.y > 1) {
        target.y--
      }
      break
    case 'ArrowRight':
      if (target.y < stepLimit) {
        target.y++
      }
      break
    case 'ArrowUp':
      if (mapIndex) {
        target.x = mapping[mapIndex - 1]
      }
      break
    case 'ArrowDown':
      if (mapIndex + 1 < mapping.length) {
        target.x = mapping[mapIndex + 1]
      }
      break
    default:
      if (Number.isInteger(keyNumber)) {
        inputBuffer += keyNumber
        console.log(keyNumber)
      } else if (mapping.includes(key)) {
        inputBuffer = key
      } else if (key === 'l') {
        target.z = 'left'
      } else if (key === 'r') {
        target.z = 'right'
      } else {
        console.log(key)
      }

      if (!(target.z in o)) {
        o[target.z] = {}
      }
  }
})

window.requestAnimationFrame(update)
