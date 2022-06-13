//*класс FormValidator настраивает валидацию полей формы*

//CLASS 
export class FormValidator { 
  constructor(data, formSelector) { 
    this._inputSelector = data.inputSelector; 
    this._submitButtonSelector = data.submitButtonSelector; 
    this._invalidButtonClass = data.invalidButtonClass; 
    this._inputErrorClass = data.inputErrorClass; 
    this._errorClass = data.errorClass; 
    this._formSelector = formSelector; 
  } 

// Мотод, который добавляет класс с ошибкой
  _showInputError(inputElement) { 
    const inputErrorElement = this._element.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    inputErrorElement.classList.add(this._errorClass);

    inputErrorElement.textContent = inputElement.validationMessage; //*передали спэну, в качестве текста, стоковое сообщение браузера об ошибке валидации
  }

  // Мотод, который удаляет класс с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const inputErrorElement = this._element.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    inputErrorElement.classList.remove(this._errorClass);

    // Очистим ошибку
    inputErrorElement.textContent = '';
  }

  // Мотод, который проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) { //*если инпут не проходит валидацию - предупреждать об ошибке 
      this._showInputError(inputElement); 
    } else { 
      this._hideInputError(inputElement); 
    } 
  } //*в качестве аргумента нужно передать конкрентный инпут в филдсэте 

  // Метод принимает массив полей
  _hasInvalidInput() { 
    return this._inputList.some((item) => { 
      return !item.validity.valid; 
    }); //*прошлись по массиву инпутов внутри формы и проверили каждый на валидность, если найдется хоть один невалидный - метод вернет true 
  } 

  // Метод принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState() { 
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) { 
      // сделай кнопку неактивной
      this.disableSubmitButton(); 
    } else {
      // иначе сделай кнопку активной
      this._submitButtonElement.classList.remove(this._invalidButtonClass); 
      this._submitButtonElement.disabled = false;
    } 
  }

  _setEventListeners() { 
    this._inputList.forEach((item) => { 
      item.addEventListener('input', () => { 
        this._isValid(item); 
 
        this._toggleButtonState(); 
      }); 
    }); //*прошлись по массиву инпутов и каждому повешали лисенер с индивидуальным обработчиком 
  } 

  resetInputErrors() { 
    this._inputList.forEach(item => { 
      this._hideInputError(item); 
    }); //*прошлись по массиву и для каждого инпута скрыли ошибки 
  }

  disableSubmitButton() { 
    this._submitButtonElement.classList.add(this._invalidButtonClass); 
    this._submitButtonElement.disabled = true; 
  }

  enableValidation() { 
    this._element = document.querySelector(this._formSelector); 

    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector)); 

    this._submitButtonElement = this._element.querySelector(this._submitButtonSelector); 
    //*записали необходимые элементы в приватные поля, так у других методов появивится к ним доступ - DRY 

    this._setEventListeners(); 
  } 
} 
