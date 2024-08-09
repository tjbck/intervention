export const set = async (key, value) => {
  if (import.meta.env.DEV) {
    console.log("key", key);
    localStorage.setItem(key, value);
  } else {
    console.log("key", key);

    chrome.storage.sync.set({ [key]: value });
  }
};

export const get = async (key) => {
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

export const remove = async (key) => {
  if (import.meta.env.DEV) {
    localStorage.removeItem(key);
  } else {
    chrome.storage.sync.remove(key);
  }
};

export const Storage = {
  get,
  set,
  remove,
};
