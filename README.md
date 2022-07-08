# Проект: Место

Одностраничный сайт, с возможностью пользователям указать свои данные, выбрать фото и загружать картинки и лайкать их.

## При его верстке использовал следующие техники:

* Центрирование секций profile с помощью flex.
* Секция elements реализована с использованием grid с auto-fit ячейками для возможности легко адаптировать отображение картинок галереи на экранах с разным разрешением, а также это решает проблему разрушения верстки при изменении количества картинок. Количество колонок и строк само рассчитывается исходя из разрешения экрана и количества картинок.
* Для секции places сделал блок c классом grid как отдельную БЭМ сущность от секции для возможности в дальнейшем использовать этот блок в других секциях сайта. В блоке используется grid-area, в разрешениях смартфонов блок перестраивается на отображения в виде одной колонки, вместо двух.
* Присутствует popup от центрованный с помощью флекса, кнопка закрытия позиционирована абсолютно.
* Все текстовые поля на сайте имеют свойство text-overflow: ellipsis; white-space: nowrap; overflow: hidden; благодаря которым, если пользователь введет слишком длинную подпись, часть ее скроется и покажет ... в конце блока и не сломает верстку

## Адаптивность сайта:

* Сайт полностью адаптивен для разрешений от 320px до 1280px.
* Страница обладает максимальной отзывчивостью, за счет использования формулы, рассчитывающей размер блоков, шрифтов, margin и padding. Формула выглядит следующим образом:

  **Calc(мин. размер + разница между мин. и макс. размером * ((100vw - разрешение для отображения мин. размера) / (макс разрешение - разрешение для отображения мин. размера)))**

ссылка на проект в github-pages: https://daniel-goncharov.github.io/russian-travel/

## JavaScript:

* Открытие и закрытие popup реализовано с помощью addEventListener на кнопках profile__add-button и popup__closed-button. При нажатии на кнопку profile__add-button, объекту с классом popup (в стилях которого указанно display: none) добавляется класс модификатор popup_opened, который имеет свойство display: flex. При нажатии кнопки popup__closed-button, класс модификатор popup_opened удаляется и всплывающее окно закрывается.
* Всплывающее окно имеет форму с двумя окнами ввода: name и job. По умолчанию они берут данные из тех, что прописаны в html разметке, но если пользователь введет свои данные и нажмет кнопку сохранить, то эти данные отобразятся в соответствующих полях на сайте.

## Планы по улучшению:
* реализовать закрытие popup не только по нажатию на крестик, но и по нажатию на любое свободное пространства вокруг окна с формой (но не по нажатию на саму форму).
