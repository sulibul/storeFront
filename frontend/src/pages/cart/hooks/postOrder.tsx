import { API_URL } from "../../../config";
import { AJAX } from "../../../utils/getJson";
import clearCart from "./clearCart";

const postOrder = async () => {
  await AJAX(`${API_URL}/cart/order/`, true, {});
  await clearCart();
};

export default postOrder;
