import "./ProductDetail.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../../utils/getJson";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import Button from "../../../components/Button";

// Define interface for product details
interface Product {
  name: string;
  description: string;
  // Add more properties as needed
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [data, setData] = useState<Product | null>(null);
  const [comments, setComments] = useState(null);

  //API get product data
  const fetchData = async () => {
    const result = await AJAX(`${API_URL}/products/${productId}`);
    const comments = await AJAX(`${API_URL}/comments/${productId}`);
    setData(result);
    setData(comments);
    console.log(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="product-info">
        {data ? (
          <div className="product product-container">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            {/* <Button onClick={}>
              <Link to={`/cart/`}></Link>
            </Button> */}
          </div>
        ) : (
          <p>no product</p>
        )}
      </div>
      <div className="Comments">
        {comments ? (
          comments.map((comment) => (
            <div className="Comment">{comment.text}</div>
          ))
        ) : (
          <p>no comments</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
