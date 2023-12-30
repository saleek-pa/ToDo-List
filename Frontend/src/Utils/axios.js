import Axios from "axios";

const userId = localStorage.getItem("userId");

export const axios = Axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      userId: userId,
   },
});
