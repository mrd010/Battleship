class Ship {
  #name;

  #length;

  #hitCount;

  #placed;

  constructor(shipDetails) {
    this.#name = shipDetails.name;
    this.#length = shipDetails.length;
    this.#hitCount = 0;
    this.#placed = false;
  }

  getName() {
    return this.#name;
  }

  setName(name) {
    this.#name = name;
  }

  getLength() {
    return this.#length;
  }

  getHitCount() {
    return this.#hitCount;
  }

  isPlaced() {
    return this.#placed;
  }

  fortify() {
    this.#placed = true;
  }

  hit() {
    this.#hitCount += 1;
  }

  isSunk() {
    return this.#hitCount >= this.#length;
  }
}

export default Ship;
