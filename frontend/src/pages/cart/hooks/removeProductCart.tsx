import React from "react";
import { AJAX } from "../../../utils/getJson";
import { API_URL } from "../../../config";

const removeProductCart = async (id: number) => {
  try {
    const result = await AJAX(`${API_URL}/cart/`, true, {
      "id": id,
      "remove": "remove",
    });
  } catch (err) {
    alert(err);
  }
};

export default removeProductCart;
