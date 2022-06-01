import GUI from 'lil-gui'

export const gui = new GUI()

const params = {
	stateOffset: 0
}

gui.add(params, 'stateOffset', { Editor: 0, Viewer: 1 })
