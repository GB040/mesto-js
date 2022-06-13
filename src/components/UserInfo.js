//*класс UserInfo - отвечает за управление отображением информации о пользователе на странице.*

//CLASS
export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector); //*элемент с именем пользователя 
    this._aboutSelector = document.querySelector(aboutSelector); //*элемент с информацией о себе
  }

  getUserInfo() { 
    const userInfo = { 
      name: this._nameSelector.textContent, 
      about: this._aboutSelector.textContent 
    } 

    return userInfo; //*вернули объект с данными пользователя 
  } 

  setUserInfo(data) { 
    this._nameSelector.textContent = data.name; 
    this._aboutSelector.textContent = data.about; 
  } //*публичный метод, который принимает данные пользователя и добавляет их на страницу, параметр data связан с обработчиком handleSubmit класса PopupWithForm
}