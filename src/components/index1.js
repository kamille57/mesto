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