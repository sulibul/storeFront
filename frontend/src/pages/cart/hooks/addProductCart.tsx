import { API_URL } from "../../../config";
import { AJAX } from "../../../utils/getJson";

const addProductCart = async (id: number) => {
  const result = await AJAX(`${API_URL}/cart`, true);
};

export default addProductCart;
