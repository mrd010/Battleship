class Ship {
  #length;

  #hitCount;

  constructor(shipSize) {
    this.#length = shipSize;
    this.#hitCount = 0;
  }

  getHitCount() {
    return this.#hitCount;
  }

  hit() {
    this.#hitCount += 1;
  }

  isSunk() {
    return this.#hitCount >= this.#length;
  }
}

export default Ship;
