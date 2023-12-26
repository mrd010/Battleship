class Ship {
  #length;

  #hitCount;

  #sunken;

  constructor(shipSize) {
    this.#length = shipSize;
    this.#hitCount = 0;
    this.#sunken = false;
  }

  hit() {
    this.#hitCount += 1;
  }
}

export default Ship;
