import { TIMEOUT_SEC } from "../config";
import axios from "axios";
import getCookie from "./getCookie";
import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

let payload = null;
type body = {
  [key: string]: any;
  // Define specific keys with their types if needed
  // key1: type1;
  // key2: type2;
};

const timeout = function (s: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//API CALL
export const AJAX = async function (
  url: string,
  uploadData: boolean = false,
  body: body = {}
) {
  try {
    if (localStorage.getItem("authTokens")) {
      const token = localStorage.getItem("authTokens");
      payload = jwtDecode(token);
      console.log(payload);
    } else {
      payload = null;
    }
    const fetchPro = uploadData
      ? client.post(url, JSON.stringify(body), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-CSRFToken": getCookie("csrftoken"),
            "user-id": payload?.id,
          },
        })
      : client.get(url, { headers: { "user-id": payload?.id } });

    const res: any = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
