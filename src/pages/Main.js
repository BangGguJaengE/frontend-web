import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/container.scss";
import logo from "../img/home-icon.png";
import uploadIcon from "../img/gallery-icon.png";
import modernImg from "../img/modern-img.png";
import warmImg from "../img/warm-img.png";
import minimalImg from "../img/minimal-img.png";
import cozyImg from "../img/cozy-img.png";
import colorfulImg from "../img/colorful-img.png";
import animationImg from "../img/animation-img.png";
import planeriorImg from "../img/planterior-img.png";
import brightImg from "../img/bright-img.png";

const Main = () => {
  const selectFile = useRef("");
  const [imgFile, setImgFile] = useState("");
  //   const [prompt, setPrompt] = useState("");

  const saveImgFile = () => {
    const file = selectFile.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

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
          <button
            className="upload-button"
            onClick={() => selectFile.current.click()}
          >
            <div className="upload-icon-image-container">
              <img
                className="upload-icon-image"
                src={uploadIcon}
                alt="uploadIcon"
              />
            </div>
            <input type="file" ref={selectFile} />
            <div className="inner-button">
              <div className="inner-button-text">방 사진 올리기</div>
            </div>
          </button>
          <div className="title-container">
            <div className="title-text">
              <span style={{ color: "#9775FA" }}>*</span>테마 선택
            </div>
          </div>

          <div className="theme-buttons-container">
            <div className="theme-four-buttons-container">
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={modernImg}
                  alt="modernImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">모던한</div>
                </div>
              </div>
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={warmImg}
                  alt="warmImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">따뜻한</div>
                </div>
              </div>
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={minimalImg}
                  alt="minimalImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">미니멀한</div>
                </div>
              </div>
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={cozyImg}
                  alt="cozyImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">아늑한</div>
                </div>
              </div>
            </div>
            <div className="theme-four-buttons-container">
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={colorfulImg}
                  alt="colorfulImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">컬러풀한</div>
                </div>
              </div>
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={animationImg}
                  alt="animationImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">동화같은</div>
                </div>
              </div>
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={planeriorImg}
                  alt="planeriorImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">자연친화</div>
                </div>
              </div>
              <div className="theme-button-container">
                <img
                  className="theme-button-img-container"
                  src={brightImg}
                  alt="brightImg"
                />
                <div className="theme-button-text-container">
                  <div className="theme-button-text">화사한</div>
                </div>
              </div>
            </div>
          </div>
          <div className="title-container">
            <div className="title-text">요청사항</div>
          </div>
          <textarea
            type="text"
            className="text-input"
            placeholder="ex. 우울한 기분이 들지 않도록 밝은 분위기로 바꿔 줘."
          />
          <Link to="/complete">
            <button className="generate-button">
              <div className="inner-button-text">생성하기</div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Main;
