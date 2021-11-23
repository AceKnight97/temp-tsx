
const CLINIC_TECHNICIAN = 'CLINIC_TECHNICIAN';
const CLINIC_PHYSICIAN = 'CLINIC_PHYSICIAN';

const { localStorage } = global.window;

const auth = {
  setLoginBioflux(bool) {
    localStorage.isLoginBioflux = bool;
  },
  login(data) {
    const { user, isSuccess, photo } = data;
    const { _id, roles } = user;
    localStorage.userId = _id;
    localStorage.isSuccess = isSuccess;
    localStorage.roles = roles;
    localStorage.photo = photo;
  },

  setLoginData(data) {
    localStorage.login = JSON.stringify(data);
  },

  updateAvatar(photo) {
    localStorage.photo = photo;
  },

  getAvatar() {
    return localStorage.photo || '';
  },

  getLoginData() {
    return localStorage.login ? JSON.parse(localStorage.login) : undefined;
  },

  isSuccess() {
    return localStorage.isSuccess === 'true';
  },

  userId() {
    return localStorage.userId;
  },

  role() {
    return localStorage.roles;
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
