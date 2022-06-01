let inp = document.getElementById('inp')
let loadie = document.getElementById('loadie')
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let saveButton = document.getElementById('save')
let loadButton = document.getElementById('load')
let imageChooserButton = document.getElementById('image-chooser')
let statorButton = document.getElementById('stator')

let resultLeft = {}
let resultRight = {}

let image = new Image()
let holdTarget = false
let pairSelect = 'a'

let zValueOffset = 0
let zValue = ''

let stateOffset = 0
let states = ['point', 'measure']

let pairColors = {
  'a': 'red',    // a
  'b': 'yellow', // b
  'c': 'blue',   // c, if available
  'd': 'black',  // d, if available
  'e': 'black',  // e, if available
  'k': 'orange', // break-lines
  's': 'green',  // stabilo
  'v': 'purple', // vMin
}

saveButton.onclick = save
statorButton.onclick = toggleState
loadButton.onclick = () => loadie.click()
imageChooserButton.onclick = () => inp.click()

image.onload = function (k) {
  canvas.width = this.width
  canvas.height = this.height
}

inp.onchange = function (e) {
  image.src = URL.createObjectURL(this.files[0])
  document.body.removeChild(inp)
}

loadie.onchange = function (e) {
  let reader = new FileReader()

  reader.onload = (d) => {
    let parsedResult = JSON.parse(d.target.result)

    let a0XMin = parsedResult['resultLeft']['a'][0][0]
    let a0YMin = parsedResult['resultLeft']['a'][0][1]

    resultLeft = parsedResult['resultLeft']
    pairColors = parsedResult['pairColors']

    parsedResult['resultLeft']['v'] = [[a0XMin, a0YMin - 60], [a0XMin + parsedResult['getRightLeftSpacing'], a0YMin - 60]]

    mirror()
  }

  reader.readAsText(this.files[0])
}

canvas.onmousedown = function (e) {
  if (!(pairSelect in resultLeft)) {
    resultLeft[pairSelect] = []
  }

  for (const [key, value] of Object.entries(resultLeft)) {
    let holdTargetDistance

    for (let i = 0; i < value.length; i++) {
      let distance = Math.sqrt((e.offsetX - value[i][0]) ** 2 + (e.offsetY - value[i][1]) ** 2)

      if (distance < 30) {
        if (distance < holdTargetDistance || !holdTargetDistance) {
          holdTarget = [key, i]
          holdTargetDistance = distance
        }
      }
    }
  }

  if (holdTarget) {
    return
  }

  if (pairSelect == 'v' && resultLeft['v'].length >= 2) {
    return
  }

  resultLeft[pairSelect].push([e.offsetX, e.offsetY])
  holdTarget = [pairSelect, resultLeft[pairSelect].length - 1]
}

canvas.onmousemove = function (e) {
  if (holdTarget !== false) {
    resultLeft[holdTarget[0]][holdTarget[1]][0] = e.offsetX
    resultLeft[holdTarget[0]][holdTarget[1]][1] = e.offsetY
  }
}

canvas.onmouseup = function () {
  holdTarget = false

  mirror()
}

document.body.onkeydown = function (e) {
  if (e.key in pairColors) {
    pairSelect = e.key
  } else if (e.key == 'Backspace') {
    if (pairSelect in resultLeft) {
      resultLeft[pairSelect].pop()

      mirror()
    }
  } else if (e.key == 'Enter') {
    let tempOffset = 0
    zValue = parseInt(zValue)

    for (const [key, value] of Object.entries(resultLeft)) {
      for (let i = 0; i < value.length; i++) {
        if (tempOffset == zValueOffset) {
          value[i].push(zValue)
          //            console.log(key, i)
        }

        tempOffset++
      }
    }

    zValueOffset++
    zValue = ''
  } else {
    let maybeNumber = parseInt(e.key)

    if (!isNaN(maybeNumber)) {
      zValue += e.key
      /*        let tempOffset = 0
      
              for (const [key, value] of Object.entries(resultLeft)) {
                for(let i = 0; i < value.length; i++) {
                  if (tempOffset == qOffset) {
      
                  }
      
                  tempOffset++
                }
              }
      
              console.log(maybeNumber)*/
    }
  }
}

function toggleState() {
  stateOffset++
  stateOffset %= states.length

  statorButton.innerText = 'state: ' + states[stateOffset]
}

function save() {
  const data = {
    getRightLeftSpacing: getRightLeftSpacing(),
    pairColors,
    resultLeft
  }

  console.log(data)

  const elem = window.document.createElement('a')
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/json' })

  elem.href = window.URL.createObjectURL(blob)
  elem.download = 'line-spacing.json'

  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}

function getRightLeftSpacing() {
  return Math.abs(resultLeft['v'][0][0] - resultLeft['v'][1][0])
}

function mirror() {
  if (!('v' in resultLeft)) {
    return
  }

  if (resultLeft['v'].length != 2) {
    return
  }

  let startX = resultLeft['a'][0][0]

  resultRight = JSON.parse(JSON.stringify(resultLeft))

  delete resultRight['v']

  for (const [key, value] of Object.entries(resultRight)) {
    for (let i = 0; i < value.length; i++) {
      resultRight[key][i][0] = -resultRight[key][i][0] + startX * 2 + getRightLeftSpacing()
    }
  }
}

/*  function pip() {
    let roj = []
 
    for (let i = 0; i < result.length; i++) {
      for (let ii = 0; ii < result[i].length; ii++) {
        roj.push([result[i][ii][0] / 2000, result[i][ii][1] / 2000])
        console.log(result[i][ii][0], result[i][ii][1])
      }
    }
 
    console.log(JSON.stringify(roj))
  }
*/

function animate() {
  requestAnimationFrame(animate)

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0)

  context.strokeText(zValue, 0, 10)

  for (const [key, value] of Object.entries(resultLeft)) {
    context.fillStyle = pairColors[key]

    for (let i = 0; i < value.length; i++) {
      context.beginPath()
      context.arc(value[i][0], value[i][1], 5, 0, 2 * Math.PI)
      context.fill()
      context.stroke()

      context.strokeText(key + (i + 1), value[i][0], value[i][1] + 15)

      if (value[i].length >= 3) {
        context.strokeText(value[i][2], value[i][0], value[i][1] - 10)
      }
    }
  }

  for (const [key, value] of Object.entries(resultRight)) {
    context.fillStyle = pairColors[key]

    for (let i = 0; i < value.length; i++) {
      context.beginPath()
      context.arc(value[i][0], value[i][1], 5, 0, 2 * Math.PI)
      context.fill()
      context.stroke()

      context.strokeText(key + (i + 1), value[i][0], value[i][1] + 15)
    }
  }
}

animate()