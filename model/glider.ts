
interface GliderMeasurement {
  a?: Number[],
  b?: Number[],
  c?: Number[],
  d?: Number[],
  e?: Number[],
  k?: Number[]
}

class Glider {
  #data: { left: GliderMeasurement, right: GliderMeasurement }
  #factory: GliderMeasurement
  #deltaMap: { left: GliderMeasurement, right: GliderMeasurement }

  constructor() { 
    this.#data = { left : {}, right : {}}
  }

  addMeasurement(side: string, group: string, point: Number, value: Number) {
    //console.warn(group, this.#data)

    if(!(group in this.#data[side])) {
      this.#data[side][group] = []
    }

    this.#data[side][group][point] = value
  }

  removeMeasurement(side: string, group: string, point: Number) {
    
  }

  setFactory(glideSide: GliderMeasurement) {
    this.#factory = glideSide
  }

  generateDelta() {

  }

  saveAsJson() {
    return this.#data
    //return {'left': this.#left, 'right': this.#right}
  }
}

/*const z = new Glider()
z.addMeasurement('left', 'a', 0, 1345)
z.addMeasurement('left', 'a', 1, 1345)
console.log(z.saveAsJson())
console.log(Glider)*/

export const glider = new Glider()