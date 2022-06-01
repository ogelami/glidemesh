import './style.css'
import * as THREE from 'three'
import Delaunator from 'delaunator'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'

let scene, camera, renderer, cube, controls, stats, material
const points = []

import glider from '../data/glider.json'
import gliderZ from '../data/glider-diff-z.json'
import pointset from '../data/pointset.json'

window.ps = pointset
window.g = glider
window.z = gliderZ

function init () {
	console.log('THREE v', THREE.REVISION)
	stats = new Stats()
	document.body.appendChild(stats.dom)

	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
	window.camera = camera
	console.log(camera)

	camera.position.z = 3

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	// camera.lookAt(new THREE.Vector3(0, 0, 0))

	controls = new OrbitControls(camera, renderer.domElement)
	console.log(controls)
	window.controls = controls

	const delaunay = Delaunator.from(glider)
	window.d = delaunay

	for (let i = 0; i < delaunay.triangles.length; i++) {
		const gliderIndex = delaunay.triangles[i]

		points.push(new THREE.Vector3(glider[gliderIndex][0], glider[gliderIndex][1], gliderZ[gliderIndex] / 850))
		// points.push(new THREE.Vector3(pointset[gliderIndex][0]/300, pointset[gliderIndex][1]/300, 0))
	}

	const geometry = new THREE.BufferGeometry().setFromPoints(points)

	material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true
	})

	cube = new THREE.Mesh(geometry, material)

	const center = new THREE.Vector3()
	cube.geometry.computeBoundingBox()
	cube.geometry.boundingBox.getCenter(center)
	cube.geometry.center()
	cube.position.copy(center)
	console.log(cube.position)

	scene.add(cube)

	// resize
	window.addEventListener('resize', onResize, false)
	onResize()
	update()
}

function update () {
	requestAnimationFrame(update)

	if (cube) {
		/* cube.rotation.x += 0.01
    cube.rotation.y += 0.01 */

		renderer.render(scene, camera)
		stats.update()
		controls.update()
	}
}

function onResize () {
	const w = window.innerWidth
	const h = window.innerHeight

	camera.aspect = w / h
	camera.updateProjectionMatrix()
	renderer.setSize(w, h)
	renderer.setPixelRatio(window.devicePixelRatio)
}

init()
