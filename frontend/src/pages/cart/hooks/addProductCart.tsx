import { API_URL } from "../../../config";
import { AJAX } from "../../../utils/getJson";

const addProductCart = async (id: number, quantity: number) => {
  const result = await AJAX(`${API_URL}/cart/`, true, {
    "id": id,
    "quantity": quantity,
  });
};

export default addProductCart;
