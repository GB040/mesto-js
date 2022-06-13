//*класс Section отвечает за отрисовку элементов на странице*

//CLASS
export class Section { 
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data; //*массив объектов с данными будущего элемента
    this._renderer = renderer; //*колбэк-функция, обеспечивающая слабое связывание классов, тело функции описывается при создании экземпляра класса
    this._container = document.querySelector(containerSelector); //*контейнер куда будут вставляться готовые элементы
  }

  renderItems() { 
    for (let i = 0; i <= 5; i++) {
      this._renderer(this._initialArray[i])
    }
  } //*метод рэндера первых шести элементов в массиве

  addItem(element) { 
    this._container.append(element); 
  } //*метод добавления элементов в DOM
}