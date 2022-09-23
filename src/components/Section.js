// класс секции - отвечает за отрисовку элементов на странице.
export default class Section {
  // конструктор секции
  constructor({ renderer }, selector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // метод отрисовывающий карточки
  renderItems(items) {
    items.forEach((item) => {
      const card = this._renderer(item);
      this.addAppendItem(card);
    })
  }

  // метод принимающий DOM-элемент и добавляющий его после предидущего
  addAppendItem(element) {
    this._container.append(element);
  }

  // метод принимающий DOM-элемент и добавляющий перед остальными элементами
  addPrependItem(element) {
    this._container.prepend(element);
  }
}