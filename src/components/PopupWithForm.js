//*класс PopupWithForm - наследник класса Popup и отвечает за открытие и закрытие попапа-формы*

import { Popup } from './Popup.js';

//CLASS 
export class PopupWithForm extends Popup { //*расширили родительский класс Popup новым функционалом за счёт наследования 
  constructor(popupSelector, formSelector, submitButtonSelector, { handleSubmit }) {
    super(popupSelector); //*ключевое слово, которое возвращает объект с унаследованными свойствами и методами родительского класса
    this._handleSubmit = handleSubmit; //*колбэк-функция, которая вызывается при сабмите формы (обработчик сабмита формы) 
    this._form = this._popup.querySelector(formSelector); 
    this._submitButton = this._popup.querySelector(submitButtonSelector);
    this._submitButtonText = this._submitButton.textContent; 
  } //*расширили конструктор за счёт добавления новых свойств

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input-text'); //*нашли все инпуты внутри формы 

    this._formValues = {}; //*создали пустой объект

    this._inputList.forEach(item => { 
        this._formValues[item.name] = item.value; 
    }); //*добавили в пустой объект значения всех инпутов, ключами будут значения атрибутов name   
  
    return this._formValues; //*вернули объект со значениями
  }

  dataLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  } //*метод, который меняет текст кнопки сабмита пока грузятся данные с сервера и возвращает исходный текст после загрузки

  close() { 
    super.close();  //*метод close() родительского класса 
    this._form.reset(); //*cбросили поля формы стоковым методом для работы с формами 
  } //*перегрузили родительский метод close() за счёт полиморфизма, теперь у одноименного метода класса PopupWithForm своя реализация и расширенная функциональность 

  setEventListeners() { 
    super.setEventListeners(); //*добавили лисенер на кнопку закрытия попапа, используя родительский метод setEventListeners() 

    this._popup.addEventListener('submit', (evt) => { 
        evt.preventDefault(); 
  
        this._handleSubmit(this._getInputValues()); //*результат работы _getInputValues окажется на месте параметра formData при описании обработчика в index.js   
      }); //*добавили лисенер на кнопку сабмита 
  } 
}