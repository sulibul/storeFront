import React from "react";
import { AJAX } from "../../../utils/getJson";
import { API_URL } from "../../../config";

const clearCart = async () => {
  try {
    const result = await AJAX(`${API_URL}/cart/`, true, {
      "clear": "clear",
    });
  } catch (err) {
    alert(err);
  }
};

export default clearCart;
