export class UserInfo {
  constructor(profileName, profileCareer) {
    this._profileName = document.querySelector(profileName);
    this._profileCareer = document.querySelector(profileCareer);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      info: this._profileCareer.textContent
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileCareer.textContent = data.career;
  }
}