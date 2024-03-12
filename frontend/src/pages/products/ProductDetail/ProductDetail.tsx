import "./ProductDetail.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../../utils/getJson";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import Button from "../../../components/Button";
import addProductCart from "../../cart/hooks/addProductCart";

// Define interface for product details
interface Product {
  name: string;
  description: string;
  id: number;
  // Add more properties as needed
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [data, setData] = useState<Product | null>(null);
  const [comments, setComments] = useState<any>([]);

  const navigate = useNavigate();
  //API get product data
  const fetchProductData = async () => {
    const result = await AJAX(`${API_URL}/products/${productId}`);
    const commentsData = await AJAX(`${API_URL}/comments/${productId}`);
    setData(result);
    if (commentsData.no_comments) setComments(null);
    else setComments(commentsData);
  };

  useEffect(() => {
    fetchProductData();
    console.log(comments);
  }, []);

  return (
    <>
      <div className="product-info">
        {data ? (
          <div className="product-info-container">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <Button
              onClick={() => {
                addProductCart(Number(productId), 1);
                navigate("/cart");
              }}
            >
              <Link to={`/cart`}></Link>
            </Button>
          </div>
        ) : (
          <p>no product</p>
        )}
      </div>
      <div className="Comments">
        {comments == [] ? (
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
