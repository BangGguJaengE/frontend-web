import React from "react";
import styled from "styled-components";

const PlusIconContainer = styled.button`
  position: absolute;
  /* top: 10px; */
  /* left: 20px; */
  width: 25px;
  border: none;
  background: none;
  height: 25px;
  opacity: 0.8;
  padding: 0;
`;

const PlusIcon = styled.div`
  width: 1.8rem;
  height: 1.8rem;
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
