fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', { 
  headers: { 
    authorization: '84f0b731-4685-4b31-9185-d609841667ca' 
  }  
}) 
  .then(res => res.json()) 
  .then((result) => { 
    const { name, about, avatar } = result; 
    // данные для обновления элементов шапки страницы 
    document.querySelector('.profile-info__name').textContent = name; 
    document.querySelector('.profile-info__profession').textContent = about; 
    document.querySelector('.profile-info__avatar').src = avatar; 
  });

  fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  fetch('https://mesto.nomoreparties.co/v1/cohortId/cards', {
  method: 'POST',
  headers: {
    authorization: '84f0b731-4685-4b31-9185-d609841667ca',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  })
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

    const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
      authorization: '84f0b731-4685-4b31-9185-d609841667ca',
      'Content-Type': 'application/json'
    }
  });

  const openConfirmPopUp = new PopupWithForm('#popupDeleteConfirm', function (data) {
    console.log(data);
    console.log('Вот тут мы должны удилть карточку, т.к. нажали ОК');
    // cardID - не хватает
    // this - не хватает
    api.deleteCard(cardId)
      .then((res) => {
        this._removeCard(res._id);
      })
      .catch((error) => {
        console.error("Произошла ошибка при удалении карточки:", error);
      });
  
  
  })
  
  openConfirmPopUp.setEventListeners();
  this._trashButton.addEventListener("click", () => {
    console.log('open confirm popup here');

    this._handleTrashClick(() => {
      this.deleteCard(this._cardId)
        .then((res) => {
          this._removeCard(res._id);
        })
        .catch((error) => {
          console.error("Произошла ошибка при удалении карточки:", error);
        });
    });
  });

  this.deleteCard(this._cardId) // this.deleteCard = apiObj.delete;
        .then(() => {   
          this._element.remove();    
        })   
        .catch((error) => {   
          console.log(error);   
        });   

        popupConfirm.setConfirmCallback(() => {
          this.deleteCard(this._cardId)
            .then(() => {
              popupConfirm.close();
              card.deleteCard();
            })
            .catch((err) => console.log(err));
        });
        popupConfirm.open();