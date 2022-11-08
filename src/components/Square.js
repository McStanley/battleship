export default class Square {
  ship = null;

  #wasAttacked = false;

  get wasAttacked() {
    return this.#wasAttacked;
  }

  attack() {
    this.#wasAttacked = true;
  }
}
