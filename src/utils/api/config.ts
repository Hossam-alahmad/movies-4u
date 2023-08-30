const authHeader = () => {
  return {
    Authorization: "bearer " + import.meta.env.VITE_APP_TMDB_TOKEN,
  };
};
const URL = import.meta.env.VITE_APP_BASE_URL;

const config = {
  authHeader,
  URL,
};
export default config;
