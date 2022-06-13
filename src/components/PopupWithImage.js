//*класс PopupWithImage - наследник класса Popup и отвечает за открытие и закрытие фото-попапа* 

import { Popup } from './Popup.js';

//CLASS 
export class PopupWithImage extends Popup { 
  constructor(popupSelector, photoSelector, photoTitleSelector) {
    super(popupSelector);
    this._photoPopupPhoto = this._popup.querySelector(photoSelector); 
    this._photoPopupTitle = this._popup.querySelector(photoTitleSelector); 
    //*чтобы поиск данных элементов не выполнялся при каждом вызове метода open, объявили их в конструкторе класса, а не в теле метода 
  }

  open(name, link) { //*добавили два параметра, аргументы получим из класса Card, при вызове этого метода в index.js, как тела колбэк-функции handleCardClick 
    this._photoPopupPhoto.src = link; 
    this._photoPopupPhoto.alt = `${name}.`; 
    this._photoPopupTitle.textContent = name; 
 
    super.open(); 
  } 
}