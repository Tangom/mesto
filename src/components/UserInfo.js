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
      info: this._profileCareer.textContent,
      avatar: this._profileAvatar.src,
      id: this._id
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileCareer.textContent = data.info;
    this._profileAvatar.src = data.avatar;
    this._id = data.id;
  }
}