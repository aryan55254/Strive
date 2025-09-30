let accessToken = null;

const authStore = {
  getToken: () => accessToken,
  setAccessToken: (token) => {
    accessToken = token;
  },
  clear: () => {
    accessToken = null;
  },
};

export default authStore;
