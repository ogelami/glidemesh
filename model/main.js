import { Editor } from "./editor"
import GUI from "lil-gui"
import { Viewer } from "./viewer"

export const gui = new GUI()

const viewer = new Viewer(document.getElementById("viewer"))
const editor = new Editor(document.getElementById("editor"))

const state = {
  Editor: 0,
  Viewer: 1,
}

const params = {
  currentState: 0,

  editorSave: () => editor.save(),
  editorChooseImage: () => editor.chooseImage(),
  editorLoad: () => editor.load(),

  viewerZFactor: 1,
	viewerFlex: false
}

let targetPage = editor
targetPage.display()

gui
  .add(params, "currentState", state)
  .name("State")
  .onChange((newState) => {
    targetPage.hide()

    if (newState === state.Editor) {
      targetPage = editor
    } else if (newState === state.Viewer) {
      targetPage = viewer
    }

    targetPage.display()

    console.log(targetPage)
  })

const editorFolder = gui.addFolder("Editor")
const viewFolder = gui.addFolder("View")

editorFolder.add(params, "editorSave").name("Save")
editorFolder.add(params, "editorChooseImage").name("Choose Image")
editorFolder.add(params, "editorLoad").name("Load")

viewFolder.add(params, "viewerZFactor", 0.1, 3).name("Z-factor")
viewFolder.add(params, "viewerFlex").name("Flex")

function render() {
  requestAnimationFrame(render)

  targetPage.render()
}

setInterval(() => targetPage.update(), 1000 / 60)

render()
