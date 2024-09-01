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
  width: 100%;
  height: 70%;
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
  flex-grow: 1;
  margin-left: 15px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  color: #888;
`;

const DetailButton = styled.button`
  background-color: #9775fa;
  color: white;
  padding: 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
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

  const products = [
    {
      id: 1,
      name: "[5%쿠폰] 드레스덴 정품 조야패브릭 호텔식 침대프레임 SS/Q/K/LK/CK (패널추가)",
      price: "199,000원",
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "데이지2 패브릭 침대프레임 퀸킹 검용",
      price: "1,090,000원",
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "[오늘의딜] SB222 심플스타일 평상형 가족 침대 SS/Q/K",
      price: "289,000원",
      imageUrl: "https://via.placeholder.com/80",
    },
  ];

  const renderItems = (items, label) => {
    return (
      <ProductList>
        <h3>{label}</h3>
        {items.map((item, idx) => (
          <ProductItem key={idx}>
            <ProductImage src={item.imageUrl} alt={item.title} />
            <ProductInfo>
              <ProductName>{item.title}</ProductName>
              <ProductPrice>{item.price}원</ProductPrice>
            </ProductInfo>
            <DetailButton
              onClick={() => window.open(item.productUrl, "_blank")}
            >
              자세히
            </DetailButton>
          </ProductItem>
        ))}
      </ProductList>

      // <FlatListContainer>
      //   <ListTitleContainer>
      //     <ListTitleText>{label}</ListTitleText>
      //   </ListTitleContainer>
      //   <FlatList
      //     data={items}
      //     renderItem={renderItem}
      //     keyExtractor={(item) => item.productUrl}
      //   />
      // </FlatListContainer>
    );
  };

  //   const renderItem = ({ item }) => {
  //     const title = item.title.replace(/<\/?b>/g, "");
  //     const price = formatPrice(item.price) + "원";
  //     const imageUrl = item.imageUrl;
  //     const url = item.productUrl;

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
                  left: `${el.coordinate[0]}px`,
                  top: `${el.coordinate[1] / 1.8}px`,
                  position: "absolute",
                }}
                click={() => {
                  console.log("items");
                  // console.log(el);
                  setA(renderItems(el.items, el.label));
                  handlePlusButtonClick(el.items, el.label);
                }}
              />
            );
          })}
        </ImageContainer>
      </div>
      {a}
      {/* {selectedProducts.length > 0 && (
        <ProductList>
          {selectedProducts.map((product) => (
            <ProductItem key={product.id}>
              <ProductImage src={product.imageUrl} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
              </ProductInfo>
              <DetailButton onClick={() => alert("자세히 클릭됨")}>
                자세히
              </DetailButton>
            </ProductItem>
          ))}
        </ProductList>
      )} */}
    </div>
  );
};

export default CompleteScreen;
