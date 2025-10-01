let accessToken = null;

const authStore = {
  getAccessToken: () => accessToken, // Renamed for clarity
  setAccessToken: (token) => {
    accessToken = token;
  },
  logout: () => {
    accessToken = null;
  },
};

export default authStore;
