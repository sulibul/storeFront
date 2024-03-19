import { API_URL } from "../../../config";
import { AJAX } from "../../../utils/getJson";

const addProductCart = async (
  id: number,
  quantity: number,
  override_quantity: boolean = false
) => {
  const result = await AJAX(`${API_URL}/cart/`, true, {
    "id": id,
    "quantity": quantity,
    "override_quantity": override_quantity,
  });
};

export default addProductCart;
