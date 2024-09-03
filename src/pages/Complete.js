import React, { useState } from "react";
import styled from "styled-components";
import "../css/container.scss";
import "../css/complete.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Plus from "../components/Plus";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
`;

const CloseIcon = styled.div`
  font-size: 35px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 40rem;
  height: 30rem;
  /* padding-bottom: 75% */
  /* height: calc(width * 0.75); */
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const ProductList = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
`;

// const PlusButton = styled.div`
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   background-color: #9775fa;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-size: 24px;
//   cursor: pointer;
//   top: ${(props) => props.top};
//   left: ${(props) => props.left};
//   display: ${(props) => (props.show ? "flex" : "none")};
// `;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 15px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 15px;
  width: 90%;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  width: 90%;
  /* line-height: 1.2; */
`;

const ProductPrice = styled.div`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

const DetailButton = styled.button`
  background-color: #9775fa;
  color: white;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 20px;
  border: none;
  width: 6rem;
  /* height: 2rem; */
  /* text-align: center; */
  cursor: pointer;
  /* white-space: nowrap; */
`;

const CompleteScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generatedImageUrl, result } = location.state.response;
  const [showPlusButtons, setShowPlusButtons] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [a, setA] = useState(<></>);

  // console.log(result);
  const handlePlusButtonClick = () => {
    setSelectedProducts(products);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const products = [];

  const renderItems = (items, label) => {
    return (
      <ProductList>
        <h3>{label}</h3>
        {items.map((item, idx) => {
          const title = item.title.replace(/<\/?b>/g, "");
          const price = formatPrice(item.price) + "원";
          const imageUrl = item.imageUrl;
          const url = item.productUrl;
          return (
            <ProductItem key={idx}>
              <div className="product-img-container">
                <ProductImage src={imageUrl} alt={title} />
              </div>
              <ProductInfo>
                <ProductName>{title}</ProductName>
                <ProductPrice>{price}</ProductPrice>
              </ProductInfo>
              <div className="detailbutton-container">
                <DetailButton onClick={() => window.open(url, "_blank")}>
                  자세히
                </DetailButton>
              </div>
            </ProductItem>
          );
        })}
      </ProductList>
    );
  };

  return (
    <div className="container">
      <div className="top-container">
        <div className="topnav-container">
          <ToggleContainer>
            {/* <ToggleSwitch
              checked={showPlusButtons}
              onChange={() => setShowPlusButtons(!showPlusButtons)}
            /> */}
            <CloseIcon
              onClick={() => {
                navigate("/");
              }}
            >
              ×
            </CloseIcon>
          </ToggleContainer>
        </div>
        <ImageContainer imageUrl={generatedImageUrl.url}>
          {result.map((el, index) => {
            console.log(el);
            return (
              <Plus
                key={index}
                style={{
                  left: `${el.coordinate[0] / 16}rem`,
                  top: `${el.coordinate[1] / 16 / 1.2}rem`,
                  position: "relative",
                }}
                click={() => {
                  console.log("items");
                  setA(renderItems(el.items, el.label));
                  handlePlusButtonClick(el.items, el.label);
                }}
              />
            );
          })}
        </ImageContainer>
      </div>
      {a}
    </div>
  );
};

export default CompleteScreen;
