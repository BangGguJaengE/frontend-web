import React from "react";
import "../css/container.scss";
import bg from "../img/bg-img.png";
import logo from "../img/home-icon.png";

const Main = () => {
  return (
    <>
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="main-text">
          내 방에 딱 맞는 인테리어, {"\n"}{" "}
          <span style={{ color: "#9775FA" }}>빵꾸집꾸</span>에게 맡겨보세요!
        </div>
        <div className="upload-container">
          <button>
            <div>dk</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
