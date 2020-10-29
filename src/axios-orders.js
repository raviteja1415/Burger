import axios from "axios";

export default axios.create({
  baseURL: "https://burger-app-4bcc5.firebaseio.com/"
});
