//*класс Card создает карточку с текстом и ссылкой на изображение*

//CLASS
export class Card {
  constructor(data, cardSelector, { handleCardPhotoClick, handleCardTrashClick, handleCardLikeClick }) { //*передали данные в виде объекта, селектор шаблона(на случай, если надо будет создать карточку по другому шаблону) и хэндлеры клика по элементам карточки
    this._name = data.name; 
    this._link = data.link; 
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector; //*записали селектор в приватное поле  
    this._handleCardPhotoClick = handleCardPhotoClick; //*колбэк-функция, которая вызывается при клике на фото карточки, описывается при создании экземпляра класса Card
    this._handleCardTrashClick = handleCardTrashClick;
    this._handleCardLikeClick = handleCardLikeClick;
  }    

  _getTemplateClone() { 
    const cardTemplate = document.querySelector(this._cardSelector).content; //*нашли шаблон карточки 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //*создали пустого клона элемента card внутри шаблона карточки 

    this._element = cardElement; //*записали пустого клона в приватное поле _element, так у других элементов появится к нему доступ
  }

  _setComponents() { 
    this._cardLike = this._element.querySelector('.card__like'); 
    this._cardTrash = this._element.querySelector('.card__trash'); 
    this._cardPhoto = this._element.querySelector('.card__photo'); 
    this._cardTitle = this._element.querySelector('.card__title'); 
    this._cardLikeQuantity = this._element.querySelector('.card__like-quantity');
  } //*нашли один раз элементы карточки и записали их в приватные поля, так у всех методов этого класса появился к ним доступ 

  _toggleCardLike() {
    this._cardLike.classList.toggle('card__like_active'); 
  }  

  _setEventListeners() { 
    this._cardLike.addEventListener('click', () => { 
      this._handleCardLikeClick();
      this._toggleCardLike(); 
    }); 
 
    this._cardTrash.addEventListener('click', () => { 
      this._handleCardTrashClick({
        id: this._id,
        cardElement: this._element
      }); //*объект с данными, который вставили в качестве аргумента, окажется на месте параметра options, при описании колбэк-функции handleCardTrashClick в index.js
    });

    this._cardPhoto.addEventListener('click', () => { 
      this._handleCardPhotoClick(this._name, this._link); //*функция-обработчик описывается при создании экземпляра класса в index.js, аргументы this._name и this._link окажутся на месте параметров name и link
    });
  } 

  showCardTrashButton(ownerId, userId) {
    if (ownerId === userId) { //*параметр ownerId - это id владельца карточки, параметр userId - это id пользователя сервиса
      this._cardTrash.classList.add('card__trash_show');
    }
  } //*при рэндере карточек с сервера, этот метод позволит сделать так, чтобы иконка удаления была только на созданных нами карточках, так как удалять чужие карточки нельзя

  activateUserLikes(likesArray, userId) {
    likesArray.forEach(item => {
      if (item._id === userId) {
        this._cardLike.classList.add('card__like_active');
      }
    }); //*при рэндере карточек, прошлись по массиву пользователей, которые поставили лайки и активировали сердечко, если в массиве есть наш лайк
  }

  createCard() { 
    this._getTemplateClone(); //*создали пустого клона 
    this._setComponents(); //*нашли элементы клона 
    this._setEventListeners(); //*добавили лисенеры на элементы клона 
 
    this._cardPhoto.src = this._link; 
    this._cardPhoto.alt = `${this._name}.`; 
    this._cardTitle.textContent = this._name; 
    this._cardLikeQuantity.textContent = this._likes.length;
    //*вставили клону ссылку на фото, заголовок-альтернативный текст и количество лайков

    return this._element; //*вернули готовую карточку 
  } //*публичный метод создания карточки, который можно вызвать во внешнем коде 
}