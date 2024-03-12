import { TIMEOUT_SEC } from "../config";
import axios from "axios";
import getCookie from "./getCookie";

axios.defaults.withCredentials = true;

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
    // body["X-CSRFToken"] = "{{ csrf_token }}";
    const fetchPro = uploadData
      ? axios.post(url, JSON.stringify(body), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-CSRFToken": getCookie("csrftoken"),
          },
        })
      : axios.get(url, { withCredentials: true });

    const res: any = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.data;
    return data;
  } catch (err) {
    throw err;
  }
};
