export const favoriteLocalStorage = (action, data) => {
  const getFavorites = () => {
    try {
      let favorites = localStorage.getItem("@favorite-books");
      if (favorites === null) {
        favorites = [];
        return favorites;
      }
      return JSON.parse(favorites);
    } catch (error) {
      console.log(error);
    }
  };

  const setFavorite = () => {
    try {
      let favorites = [];
      favorites = getFavorites();
      favorites.push(data);
      console.warn(favorites);
      localStorage.setItem("@favorite-books", JSON.stringify(favorites));
      console.log("favoritado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = () => {
    try {
      let favorites = [];
      favorites = getFavorites();
      let index = favorites.findIndex((obj) => obj !== null && obj.id === data);
      favorites.splice(index, 1);
      localStorage.setItem("@favorite-books", JSON.stringify(favorites));
      return console.log("desfavoritado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  if (action === "addFavorite") {
    return setFavorite();
  } else if (action === "getFavorites") {
    return getFavorites();
  } else if (action === "removeFavorite") {
    return removeFavorite();
  }
  return "";
};
