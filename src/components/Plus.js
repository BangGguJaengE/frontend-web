import React from "react";
import styled from "styled-components";

const PlusIconContainer = styled.button`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
  opacity: 0.8;
`;

const PlusIcon = styled.div`
  width: 17px;
  height: 17px;
  background-image: url(${require("../img/plus-icon.png")});
  background-size: cover;
  background-position: center;
`;

export default function Plus({ style, click }) {
  return (
    <PlusIconContainer style={style} onClick={click}>
      <PlusIcon />
    </PlusIconContainer>
  );
}
