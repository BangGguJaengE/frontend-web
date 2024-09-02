import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";

const Main = () => {
  const selectFile = useRef("");
  const [imgFile, setImgFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const themePrompts = {
    modern: "모던한 스타일로 ",
    warm: "따뜻한 느낌으로 ",
    minimal: "미니멀한 디자인으로 ",
    cozy: "아늑한 분위기로 ",
    colorful: "컬러풀하게 ",
    animation: "동화같은 스타일로 ",
    planterior: "자연친화적인 스타일로 ",
    light: "화사한 느낌으로 ",
  };

  useEffect(() => {
    if (selectedTheme) {
      setPrompt((prevPrompt) => {
        // 프롬프트가 이전에 설정한 테마와 같은 내용이면 추가하지 않음
        const themeText = themePrompts[selectedTheme];
        return prevPrompt.includes(themeText)
          ? prevPrompt
          : themeText + prevPrompt;
      });
    }
  }, [selectedTheme]);

  const saveImgFile = () => {
    const file = selectFile.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const handleGenerate = async () => {
    if (!imgFile || !prompt) {
      alert("이미지를 입력하고 프롬프트를 작성해주세요.");
      return;
    }

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

    // const file = selectFile.current.files[0];
    const file = imgFile;
    // console.log(file);
    // console.log(imgFile);

    if (!file) {
      alert("파일이 선택되지 않았습니다. 파일을 선택해주세요.");
      return;
    }

    // const formData = new FormData();

    // const p = new Blob([
    //   JSON.stringify({
    //     prompt: `${prompt}. 나는 ${selectedTheme}한 스타일을 원해.`,
    //   }),
    //   { type: "multipart/form-data" },
    // ]);

    // formData.append("body", p);

    // formData.append("file", imgFile);

    // formData.append(
    //   "body",
    //   JSON.stringify({
    //     prompt: `${prompt}. 나는 ${selectedTheme}한 스타일을 원해.`,
    //   })
    // );

    // formData.append("file", file);
    // console.log(formData);
    // formData.append("file", {
    //   name: file.name,
    //   type: file.type,
    //   uri: URL.createObjectURL(file), // 웹에서는 실제로 'uri'를 사용하지 않지만, 형식 유지 차원에서 추가
    // });

    try {
      const res = await axios.post(
        "http://3.39.236.242:3000/api/interior/generate",
        {
          img_url: imgUrl,
          prompt: `${prompt}. 나는 ${selectedTheme}한 스타일을 원해.`,
        }
      );

      const response = res.data;
      console.log(response);
      navigate("/complete", { state: { response } });
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("이미지 업로드에 실패했습니다.");
    }
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
              {/* style=
              {{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
              }} */}
              <img
                className="input-img"
                src={imgFile}
                alt="Selected"
                // style={{
                //   width: "100%",
                //   height: "auto",
                //   borderRadius: "16px",
                //   objectFit: "cover",
                // }}
              />
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
              <div
                className={`theme-button-container" ${
                  selectedTheme === "modern" ? "selected" : ""
                }`}
                onClick={() => setSelectedTheme("modern")}
              >
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {/* <Link to="/complete"> */}
          <button className="generate-button" onClick={handleGenerate}>
            <div className="inner-button-text">생성하기</div>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default Main;
