import { Page } from "./page"
//import { glider } from './store'
import Delaunator from "delaunator"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

import XGlider from "../data/glider.json"
import XGliderZ from "../data/glider-diff-z.json"

import * as THREE from "three"

export class Viewer extends Page {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  material: THREE.Material
  cube: THREE.Mesh

  points: Array<THREE.Vector3>

  constructor(dom: HTMLElement) {
    super(dom)

    this.points = []

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    )

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.z = 3

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    dom.appendChild(this.renderer.domElement)

    const delaunay = Delaunator.from(XGlider)

    for (let i = 0; i < delaunay.triangles.length; i++) {
      const gliderIndex = delaunay.triangles[i]

      this.points.push(
        new THREE.Vector3(
          XGlider[gliderIndex][0],
          XGlider[gliderIndex][1],
          XGliderZ[gliderIndex] / 850
        )
      )
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points)

    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    })

    this.cube = new THREE.Mesh(geometry, this.material as THREE.MeshBasicMaterial)

    const center = new THREE.Vector3()

    this.cube.geometry.computeBoundingBox()
    this.cube.geometry.boundingBox.getCenter(center)
    this.cube.geometry.center();

    this.cube.position.copy(center)

    this.scene.add(this.cube)
  }

  display(): void {
    super.display()
    window.addEventListener("resize", this.onResize, false)
  }

  hide(): void {
    super.hide()
    window.removeEventListener("resize", this.onResize)
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
      /* cube.rotation.x += 0.01
      cube.rotation.y += 0.01 */

      this.renderer.render(this.scene, this.camera)
      this.controls.update()
    }
  }
}
