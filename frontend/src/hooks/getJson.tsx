import { TIMEOUT_SEC } from "../config";
import axios from "axios";

const timeout = function (s: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//API CALL
export const AJAX = async function (url: string, uploadData: boolean = false) {
  try {
    const fetchPro = uploadData
      ? axios.post(url, {
          method: "POST",
          headers: {},
        })
      : axios.get(url);

    const res: any = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
