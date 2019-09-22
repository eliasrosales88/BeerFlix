const API_KEY = "NBJE5XD-30P4HV3-M6F9BMW-XJJ75D9";


const myHeaders = {
  "X-API-KEY": API_KEY,
  "Content-Type": "application/json"
};

const apiComment = (API_URL = "https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers") => {
  
  return {

    postBeerComment: async (id, text) => {
      const beersCommentsAPIEndpoint = `${API_URL}/${id}/comment`;
      const requestUrl = beersCommentsAPIEndpoint;
      const response = await fetch(requestUrl, { 
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        body: JSON.stringify({ "comment": text }) 
      });
      try {
        if (!response.ok) {
          throw new Error("Error fetching beer comments");
        }
        const data = await response.json();
        
        return data.beer.comment;

      } catch (err) {
        console.error(err.message);
        throw err;
      }      
    }
  };
};


export default apiComment;
