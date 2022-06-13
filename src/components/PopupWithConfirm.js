//*класс PopupWithConfirm - наследник класса Popup и отвечает за открытие и закрытие попапа с подтверждением*

import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup { 
  constructor(popupSelector, submitButtonSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector(submitButtonSelector);
  }

  open(options) {
    super.open();

    this._id = options.id; //*записали в поле идентификатор карточки, чтобы можно было удалить её с сервера
    this._cardElement = options.cardElement; //*записали в поле элемент карточки, чтобы можно было удалить её из разметки
  } //*options - это объект с данными, который описали при создании колбэк-функции handleCardTrashClick, в классе Card

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener('click', () => {
      this._handleSubmit({
        cardId: this._id,
        cardElement: this._cardElement
      }); //*идентификатор и элемент карточки, по которой произошёл клик-удаления, окажутся на месте параметров колбэк-функции handleSubmit в index.js
    });
  }
}
