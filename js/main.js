const BASE_URL = "https://dummyjson.com/";

export async function fetchData(endpoint, callback) {
   try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      
      callback(data);
   } catch (error) {
      console.log(error);
   }
}
