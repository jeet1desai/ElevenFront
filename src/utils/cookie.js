import Cookies from 'js-cookie';

class CookieStorage {
  constructor() {
    this.keys = new Set();
  }

  getItem(key) {
    return Cookies.get(key);
  }

  setItem(key, value, attributes) {
    this.keys.add(key);
    Cookies.set(key, value, attributes);
  }

  removeItem(key) {
    this.keys.delete(key);
    Cookies.remove(key);
  }

  clear() {
    this.keys.forEach((key) => this.removeItem(key));
  }
}

export const cookieStorage = new CookieStorage();
