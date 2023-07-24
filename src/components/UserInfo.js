export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(aboutSelector);
      this._avatarElement = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      const name = this._nameElement.textContent;
      const about = this._aboutElement.textContent;
      return { name, about };
    }
  
    setUserInfo({name, about}) {
      this._nameElement.textContent = name;
      this._aboutElement.textContent = about;
    }

    setUserAvatar(avatar) {
      this._avatarElement.src = avatar;
    }

  }