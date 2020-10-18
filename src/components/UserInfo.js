export class UserInfo {
  constructor(profileName, profileCareer, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileCareer = document.querySelector(profileCareer);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._id = '';
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      about: this._profileCareer.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileCareer.textContent = data.about;
    this._id = data._id;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}

