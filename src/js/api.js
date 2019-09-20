const API_KEY = "NBJE5XD-30P4HV3-M6F9BMW-XJJ75D9";

const myHeaders = {
  "X-API-KEY": API_KEY
};

const miInitGet = { 
  method: "GET",
  headers: myHeaders,
  mode: "cors",
};

const miInitPOST = { 
  method: "POST",
  headers: myHeaders,
  mode: "cors",
};

const api = (API_URL = "https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers") => {
  
  return {
    getBeers: async text => {
      const searchAPIEndpoint = `${API_URL}?limit=10&search=`;
      const beersAPIEndpoint = `${API_URL}?limit=10`;
      const requestUrl = text ? `${searchAPIEndpoint}${text}` : beersAPIEndpoint;
      const response = await fetch(requestUrl, miInitGet);
      try {
        if (!response.ok) {
          throw new Error("Error fetching beers");
        }
        const data = await response.json();
        return data.beers;

      } catch (err) {
        console.error(err.message);
        throw err;
      }      
    },

    getBeer: async id => {
      const beersAPIEndpoint = `${API_URL}`;
      const requestUrl =`${beersAPIEndpoint}/${id}`;
      const response = await fetch(requestUrl, miInitGet);
      try {
        if (!response.ok) {
          throw new Error("Error fetching beer");
        }
        const data = await response.json();
        return data.beer;

      } catch (err) {
        console.error(err.message);
        throw err;
      }      
    },

    postBeerLike: async id => {
      const beersLikesAPIEndpoint = `${API_URL}/${id}/like`;
      const requestUrl = beersLikesAPIEndpoint;
      const response = await fetch(requestUrl, miInitPOST);
      try {
        if (!response.ok) {
          throw new Error("Error fetching beer likes");
        }
        const data = await response.json();
        return data.beerLikes;

      } catch (err) {
        console.error(err.message);
        throw err;
      }      
    }
  };
};


export default api;
