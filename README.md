# Проект: Место

Одностраничный сайт, с возможностью пользователям указать свои данные, выбрать фото и загружать картинки и лайкать их.
Был разработан в рамках обучения на курсе Веб разработчик в Яндекс Практикум.
[Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

## При его верстке использовал следующие техники:

* Центрирование секций profile с помощью flex.
* Секция elements реализована с использованием grid с auto-fit ячейками для возможности легко адаптировать отображение картинок галереи на экранах с разным разрешением, а также это решает проблему разрушения верстки при изменении количества картинок. Количество колонок и строк само рассчитывается исходя из разрешения экрана и количества картинок.
* Для секции places сделал блок c классом grid как отдельную БЭМ сущность от секции для возможности в дальнейшем использовать этот блок в других секциях сайта. В блоке используется grid-area, в разрешениях смартфонов блок перестраивается на отображения в виде одной колонки, вместо двух.
* Модальные окна центрированны с помощью флекса, кнопка закрытия позиционирована абсолютно.
* Модальные окна открываются плавно, за счет использования css свойства visibility: hidden, вместо display: none.
* Все текстовые поля на сайте имеют свойство text-overflow: ellipsis; white-space: nowrap; overflow: hidden; благодаря которым, если пользователь введет слишком длинную подпись, часть ее скроется и покажет ... в конце блока и не сломает верстку
* карточки в секции elements создается с помощью JS из массива и используют заготовленную размету скрытую в теге <template>

## Адаптивность сайта:

* Сайт полностью адаптивен для разрешений от 320px до 1280px.
* Страница обладает максимальной отзывчивостью, за счет использования формулы, рассчитывающей размер блоков, шрифтов, margin и padding. Формула выглядит следующим образом:

  **Calc(мин. размер + разница между мин. и макс. размером * ((100vw - разрешение для отображения мин. размера) / (макс разрешение - разрешение для отображения мин. размера)))**


## JavaScript:

* Реализована загрузка стартовых шести карточек из массива
* Модальное окно профиля имеет форму с двумя окнами ввода: name и job. По умолчанию они берут данные из тех, что прописаны в html разметке, но если пользователь введет свои данные и нажмет кнопку сохранить, то эти данные отобразятся в соответствующих полях на сайте. Форму можно отправить не только нажав кнопку сохранить, но и нажав кнопку enter на клавиатуре, поскольку обработчик события отслеживает не клик по кнопке, а событие submit.
* Модальное окно добавления карточки имеет форму с двумя окнами ввода: placeName и placeURL. Пользователь вводит имя и ссылку на картинку. Форму можно отправить не только нажав кнопку создать, но и нажав кнопку enter на клавиатуре, поскольку обработчик события отслеживает не клик по кнопке, а событие submit. Поскольку для создания карточки не используется методы  innerHTMLи insertAdjacentHTML это позволяет избежать XSS уязвимости так как все, что вводится в окно placeName переводится в текст, а в окно placeURL нельзя ввести ничего кроме ссылки.
* Реализовано модальное окно, которое открывает увеличенную картинку из карточки.
* Любую карточку можно удалить по нажатию кнопки в виде корзины.
* Любую карточку можно лайкнуть.
* Модальное окно можно закрыть нажатием на Esc, на кнопку закрытия и нажав на свободное место вокруг окна
* Добавлена валидация форм
* В разработке использована парадигма ООП. Добавлены классы Card, FormValidator, Popup, PopupWithForm(наследует часть методов из класса Popup), PopupWithImage(наследует часть методов из класса Popup), Section, UserInfo


ссылка на проект в github-pages: https://daniel-goncharov.github.io/mesto/

