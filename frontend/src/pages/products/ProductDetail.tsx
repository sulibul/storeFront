import "../../assets/styles/ProductDetail.scss";
import { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";
import Button from "../../components/Button";
import addProductCart from "../cart/hooks/addProductCart";

// Define interface for product details
interface Product {
  name: string;
  price: number;
  product_img: string;
  description: string;
  id: number;
  // Add more properties as needed
}

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProductData] = useState<Product | null>(null);
  const [comments, setComments] = useState<any>([]);

  const navigate = useNavigate();
  //API get product productData
  const fetchProductData = async () => {
    const result = await AJAX(`${API_URL}/products/${productId}`);
    const commentsData = await AJAX(`${API_URL}/comments/${productId}`);
    setProductData(result);

    console.log(commentsData);
    if (!commentsData) setComments([]);
    else if (Array.isArray(commentsData)) setComments(commentsData);
    else setComments([commentsData]);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <div className="product-page">
        <div className="upper-container">
          <div className="product-image">
            {productData ? (
              <img src={productData.product_img} alt={productData.name} />
            ) : (
              <p>no image</p>
            )}
          </div>
          <div className="product-info">
            {productData ? (
              <div className="product-info-container">
                <h2>{productData.name}</h2>
                <p className="product-description">{productData.description}</p>
              </div>
            ) : (
              <p>no product</p>
            )}
            <div className="bottom-part-info">
              {productData && (
                <p className="product-price">{productData.price}$</p>
              )}
              <Button
                className="add-to-cart"
                onClick={() => {
                  addProductCart(Number(productId), 1);
                  navigate("/cart");
                }}
              >
                <p>Add to Cart</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="comments-container">
          {comments ? (
            comments.map((comment: any) => (
              <div className="comment">
                <div className="comment-user">{comment.user}</div>
                <div className="comment-content">{comment.text}</div>
              </div>
            ))
          ) : (
            <p>no comments</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
