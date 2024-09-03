import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/container.scss";
import logo from "../img/home-icon.png";
import spinner from "../img/loading-spinner1.gif";
import uploadIcon from "../img/gallery-icon.png";
import modernImg from "../img/modern-img.png";
import warmImg from "../img/warm-img.png";
import minimalImg from "../img/minimal-img.png";
import cozyImg from "../img/cozy-img.png";
import colorfulImg from "../img/colorful-img.png";
import animationImg from "../img/animation-img.png";
import planteriorImg from "../img/planterior-img.png";
import brightImg from "../img/bright-img.png";
import axios from "axios";
import styled from "styled-components";

const ThemeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 4px 20px rgba(24, 23, 37, 0.1));
  border: 2.5px solid
    ${({ selected }) => (selected ? "#9775FA" : "transparent")};
  border-radius: 10px;
  margin: 1px;

  &:hover {
    transition-duration: 500ms;
    opacity: 0.6;
  }
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

const GenerateButton = styled.button`
  background-color: ${({ imgFile, prompt }) =>
    imgFile && prompt ? "#6c48c6" : "#CED4DA"};
  /* color: white; */
  /* padding: 10px; */
  /* border-radius: 5px; */
  /* border: none; */
  cursor: ${({ imgFile, prompt }) =>
    imgFile && prompt ? "pointer" : "not-allowed"};
  font-size: 16px;
  width: 30rem;
  height: 54px;
  border-radius: 15px;
  margin-top: 1em;
  margin-bottom: 2em;
  border: solid 1px transparent;
  filter: drop-shadow(0 4px 20px rgba(24, 23, 37, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: ${({ imgFile, prompt }) => (imgFile && prompt ? 0.8 : 1)};
    transition-duration: ${({ imgFile, prompt }) =>
      imgFile && prompt ? "500ms" : "0"};
  }
`;

const Main = () => {
  const navigate = useNavigate();
  const selectFile = useRef("");
  const [imgFile, setImgFile] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveImgFile = () => {
    const file = selectFile.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const removeImage = () => {
    setImgFile(null);
  };

  const toggleTheme = (theme) => {
    setSelectedTheme((prevTheme) => (prevTheme === theme ? null : theme));
  };

  const handlePromptInput = (e) => {
    setPrompt(e.target.value);
    // console.log(prompt);
  };

  const handleGenerate = async () => {
    if (!imgFile || !prompt) {
      alert("이미지를 입력하고 프롬프트를 작성해주세요.");
      return;
    }
    setIsLoading(true); // 로딩 상태 시작

    const byteString = atob(imgFile.split(",")[1]);
    const mimeString = imgFile.split(",")[0].split(":")[1].split(";")[0];

    // Base64를 바이너리 데이터로 변환
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Blob 객체 생성
    const blob = new Blob([ab], { type: mimeString });

    const formData = new FormData();
    formData.append("file", blob);
    console.log(blob);

    const resData = await axios.post(
      "http://3.39.236.242:3000/api/interior/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const imgUrl = resData.data.url;
    const file = imgFile;

    if (!file) {
      alert("파일이 선택되지 않았습니다. 파일을 선택해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        "http://3.39.236.242:3000/api/interior/generate",
        {
          img_url: imgUrl,
          prompt: `${prompt}. 나는 ${selectedTheme}한 스타일을 원해.`,
        }
      );
      console.log(`${prompt}. 나는 ${selectedTheme}한 스타일을 원해.`);
      const response = res.data;
      console.log(response);
      navigate("/complete", { state: { response } });
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen>
          {/* <SpinnerContainer> */}
          {/* <SpinnerImageContainer /> */}
          <div className="spinner-container">
            <img className="spinner-img" src={spinner} alt="spinner" />
            <div className="loading-text">생성 중...👀</div>
            <div className="loading-text">
              30초~2분 정도 걸려요. 조금만 기다려주세요!
            </div>
          </div>

          {/* </SpinnerImageContainer> */}
          {/* </SpinnerContainer> */}
        </LoadingScreen>
      )}

      <div style={{ overflow: "hidden" }}>
        <p className="header-container">
          ▶︎
          <span style={{ fontWeight: "bold", color: "#9775FA" }}>
            빵꾸집꾸🏠
          </span>
          는 원래 앱으로 만들어졌어요. {"\n"}본 화면은 제품 서비스 시연을 위한
          웹페이지에요. <span style={{ fontWeight: "bold" }}> 1.</span> 방
          사진을 올려주세요.
          <span style={{ fontWeight: "bold" }}> 2.</span>원하는 스타일과
          요청사항을 입력하세요. <span style={{ fontWeight: "bold" }}> 3.</span>
          [생성하기]버튼을 누르면 새로워진 내 방🏡을 만날 수 있어요!◀︎
          <span> ㅤㅤㅤ</span>▶︎
          <span style={{ fontWeight: "bold", color: "#9775FA" }}>
            빵꾸집꾸🏠
          </span>
          는 원래 앱으로 만들어졌어요. {"\n"}본 화면은 제품 서비스 시연을 위한
          웹페이지에요. <span style={{ fontWeight: "bold" }}> 1.</span> 방
          사진을 올려주세요.
          <span style={{ fontWeight: "bold" }}> 2.</span>원하는 스타일과
          요청사항을 입력하세요. <span style={{ fontWeight: "bold" }}> 3.</span>
          [생성하기]버튼을 누르면 새로워진 내 방🏡을 만날 수 있어요!◀︎
        </p>
      </div>
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="main-text">
          내 방에 딱 맞는 인테리어, {"\n"}{" "}
          <span style={{ color: "#9775FA" }}>빵꾸집꾸</span>에게 맡겨보세요!
        </div>
        <div className="upload-container">
          {!imgFile ? (
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
              <input
                type="file"
                ref={selectFile}
                style={{ display: "none" }}
                onChange={saveImgFile}
              />
              <div className="inner-button">
                <div className="inner-button-text">방 사진 올리기</div>
              </div>
            </button>
          ) : (
            <div
              className="image-preview"
              onClick={() => selectFile.current.click()}
            >
              <img className="input-img" src={imgFile} alt="Selected" />

              <input
                type="file"
                ref={selectFile}
                style={{ display: "none" }}
                onChange={saveImgFile}
              />
            </div>
          )}
          <div className="title-container">
            <div className="title-text">
              <span style={{ color: "#9775FA" }}>*</span>테마 선택
            </div>
          </div>

          <div className="theme-buttons-container">
            <div className="theme-four-buttons-container">
              <ThemeButtonContainer
                selected={selectedTheme === "modern"}
                onClick={() => {
                  toggleTheme("modern");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={modernImg}
                  alt="modernImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">모던한</div>
                </div>
              </ThemeButtonContainer>

              <ThemeButtonContainer
                selected={selectedTheme === "warm"}
                onClick={() => {
                  toggleTheme("warm");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={warmImg}
                  alt="warmImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">따뜻한</div>
                </div>
              </ThemeButtonContainer>

              <ThemeButtonContainer
                selected={selectedTheme === "minimal"}
                onClick={() => {
                  toggleTheme("minimal");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={minimalImg}
                  alt="minimalImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">미니멀한</div>
                </div>
              </ThemeButtonContainer>

              <ThemeButtonContainer
                selected={selectedTheme === "cozy"}
                onClick={() => {
                  toggleTheme("cozy");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={cozyImg}
                  alt="cozyImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">아늑한</div>
                </div>
              </ThemeButtonContainer>
            </div>

            <div className="theme-four-buttons-container">
              <ThemeButtonContainer
                selected={selectedTheme === "colorful"}
                onClick={() => {
                  toggleTheme("colorful");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={colorfulImg}
                  alt="colorfulImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">컬러풀한</div>
                </div>
              </ThemeButtonContainer>

              <ThemeButtonContainer
                selected={selectedTheme === "animation"}
                onClick={() => {
                  toggleTheme("animation");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={animationImg}
                  alt="animationImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">동화같은</div>
                </div>
              </ThemeButtonContainer>

              <ThemeButtonContainer
                selected={selectedTheme === "planterior"}
                onClick={() => {
                  toggleTheme("planterior");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={planteriorImg}
                  alt="planteriorImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">자연친화</div>
                </div>
              </ThemeButtonContainer>

              <ThemeButtonContainer
                selected={selectedTheme === "bright"}
                onClick={() => {
                  toggleTheme("bright");
                }}
              >
                <img
                  className="theme-button-img-container"
                  src={brightImg}
                  alt="brightImg"
                />

                <div className="theme-button-text-container">
                  <div className="theme-button-text">화사한</div>
                </div>
              </ThemeButtonContainer>
            </div>
          </div>
          <div className="title-container">
            <div className="title-text">요청사항</div>
          </div>
          <textarea
            type="text"
            className="text-input"
            placeholder="ex. 우울한 기분이 들지 않도록 밝은 분위기로 바꿔 줘."
            value={prompt}
            onChange={handlePromptInput}
          />
          {/* <button
            className="generate-button"
            onClick={handleGenerate}
            style={{
              backgroundColor: imgFile && prompt ? "#9775FA" : "#CED4DA",
            }}
          > */}
          <GenerateButton
            onClick={handleGenerate}
            imgFile={imgFile}
            prompt={prompt}
          >
            <div className="inner-button-text">생성하기</div>
          </GenerateButton>
          {/* </button> */}
        </div>
      </div>
    </>
  );
};
export default Main;
