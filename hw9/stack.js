class Stack {
  constructor() {
    this._data = [];
  }

  push(item) {
    this._data.push(item);
  }

  pop() {
    return this._data.pop(); 
  }

  peek() {
    return this._data[this._data.length - 1]; 
  }
}
