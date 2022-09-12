// класс секции - отвечает за отрисовку элементов на странице.
export default class Section {
  // конструктор секции
  constructor({ items , renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // метод отрисовывающий карточки
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  // метод принимающий DOM-элемент и добавляющий его в то место разметки, куда его нужно вставить
  addItem(element) {
    this._container.prepend(element);
  }
}