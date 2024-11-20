import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // auth: {
  //   username: "efis",
  //   password: "efis@bstc",
  // },
});


// const basePath = axios.create({
//   baseURL: "http://localhost:8080", 
// });

// export default basePath;
