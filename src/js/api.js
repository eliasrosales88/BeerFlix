const API_KEY = "NBJE5XD-30P4HV3-M6F9BMW-XJJ75D9";

const myHeaders = {
  "X-API-KEY": API_KEY
};

const miInit = { 
  method: "GET",
  headers: myHeaders,
  mode: "cors",
};

const api = (API_URL = "https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers") => {
  
  return {
    getBeers: async text => {
      const searchAPIEndpoint = `${API_URL}?search=`;
      const showsAPIEndpoint = `${API_URL}`;
      const requestUrl = text ? `${searchAPIEndpoint}${text}` : showsAPIEndpoint;
      const response = await fetch(requestUrl, miInit);
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
    }
  };
};


export default api;
