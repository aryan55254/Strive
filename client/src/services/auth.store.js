let accessToken = null;

const authStore = {
  getAccessToken: () => accessToken,
  setAccessToken: (token) => {
    accessToken = token;
  },
};

export default authStore;
