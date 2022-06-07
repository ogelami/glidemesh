import { Page } from './page'
import { glider } from './store'
import Delaunator from 'delaunator'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import XGlider from '../data/glider.json'
import XGliderZ from '../data/glider-diff-z.json'

import * as THREE from 'three'

export class Viewer extends Page {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  rayCaster: THREE.Raycaster
  controls: OrbitControls
  material: THREE.Material
  cube: THREE.Mesh
  dTriangles: Delaunator
  pointer: THREE.Vector2

  flex: boolean
  zFactor: number

  points: Array<THREE.Vector3>
  spheres: Array<THREE.Mesh>

  constructor(dom: HTMLElement) {
    super(dom)

    this.flex = false
    this.points = []
    this.spheres = []
    this.zFactor = 1

    this.pointer = new THREE.Vector2()

    this.scene = new THREE.Scene()
    console.log(this.scene)
    this.renderer = new THREE.WebGLRenderer()
    this.rayCaster = new THREE.Raycaster()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    )

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.z = 3
    this.rayCaster.params.Points.threshold = 0.1
    //this.rayCaster.params.Line.threshold = 13;

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    dom.appendChild(this.renderer.domElement)

    this.dTriangles = Delaunator.from(XGlider)
    //  this.reload()
    console.log(this.phun)
    this.phun()
  }

  phun() {
    for (const [pair, value] of Object.entries(glider.left)) {
      console.log(pair, value)

      console.log(glider.pairColors[pair])

      for (const coordinate of value) {
        console.log(coordinate[0], coordinate[1])
      }
    }
  }

  reload(): void {
    this.points = []

    for (let i = 0; i < this.dTriangles.triangles.length; i++) {
      const gliderIndex = this.dTriangles.triangles[i]

      this.points.push(
        new THREE.Vector3(
          XGlider[gliderIndex][0],
          XGlider[gliderIndex][1],
          XGliderZ[gliderIndex] / 850 / this.zFactor
        )
      )
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points)

    console.log(geometry)

    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    })

    if (this.cube) {
      this.scene.remove(this.cube)
    }

    for (let i = 0; i < this.spheres.length; i++) {
      this.scene.remove(this.spheres[i])
    }

    for (let i = 0; i < XGlider.length; i++) {
      const sphereGeometry = new THREE.SphereGeometry(0.01, 32, 32)
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

      sphere.position.x = XGlider[i][0]
      sphere.position.y = XGlider[i][1]
      sphere.position.z = XGliderZ[i] / 850 / this.zFactor

      this.scene.add(sphere)

      this.spheres.push(sphere)
    }

    this.cube = new THREE.Mesh(
      geometry,
      this.material as THREE.MeshBasicMaterial
    )
    console.log(this.cube)

    const center = new THREE.Vector3()

    this.cube.geometry.computeBoundingBox()
    this.cube.geometry.boundingBox.getCenter(center)
    this.cube.geometry.center()

    this.cube.position.copy(center)

    this.scene.add(this.cube)
  }

  display(): void {
    super.display()
    window.addEventListener('resize', () => this.onResize(), false)
    this.dom.addEventListener('pointermove', (e) => this.mouseMove(e))
  }

  hide(): void {
    super.hide()
    window.removeEventListener('resize', () => this.onResize())
    this.dom.removeEventListener('pointermove', (e) => this.mouseMove(e))
  }

  mouseMove(e) {
    /*this.pointer.x = e.offsetX
    this.pointer.y = e.offsetY*/

    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  onResize() {
    const w = window.innerWidth
    const h = window.innerHeight

    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  render(): void {
    if (this.cube) {
      if (this.flex) {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
      }

      this.rayCaster.setFromCamera(this.pointer, this.camera)

      const interesects = this.rayCaster.intersectObjects(this.spheres)

      for (let i = 0; i < interesects.length; i++) {
        this.scene.remove(interesects[i].object)
      }

      this.renderer.render(this.scene, this.camera)
      this.controls.update()
    }
  }
}
