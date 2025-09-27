const authStore = {
  // These will be provided by the AuthContext when the app loads
  setAccessToken: () => {},
  logout: () => {},
  accessToken: null,

  setTokenInStore(token) {
    this.accessToken = token;
  },

  getToken() {
    return this.accessToken;
  },
};

export default authStore;
