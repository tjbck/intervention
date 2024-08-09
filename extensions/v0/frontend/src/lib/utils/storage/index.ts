export const set = (key, value) => {
  if (import.meta.env.DEV) {
    localStorage.setItem(key, value);
  } else {
    chrome.storage.sync.set({ [key]: value });
  }
};

export const get = (key) => {
  if (import.meta.env.DEV) {
    return localStorage.getItem(key);
  } else {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(result[key]);
      });
    });
  }
};

export const remove = (key) => {
  if (import.meta.env.DEV) {
    localStorage.removeItem(key);
  } else {
    chrome.storage.sync.remove(key);
  }
};
