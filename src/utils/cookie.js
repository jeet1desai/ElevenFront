export const setCookie = (name, value, daysToExpire) => {
  let cookie = name + '=' + encodeURIComponent(value);

  if (daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    cookie += '; expires=' + expirationDate.toUTCString();
  }

  document.cookie = cookie;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const cookiePair = cookie.split('=');
    const cookieName = cookiePair[0].trim();

    if (cookieName === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
};

export const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
