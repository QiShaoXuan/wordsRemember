import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import wordListJSON from "./words.json";
import shuffle from "lodash.shuffle";
import "./App.scss";

function App() {
  const [wordList, setWordList] = useState(wordListJSON);
  const [mode, setMode] = useState("order"); // order | random
  const [index, setIndex] = useState(1);
  useEffect(() => {}, []);

  const onModeChange = (newMode) => {
    if (newMode === mode) return;
    switch (newMode) {
      case "order":
        setWordList(wordListJSON);
        break;
      case "random":
        setWordList(shuffle(wordListJSON));
        break;
    }
    setMode(newMode);
  };

  return (
    <div className="App">
      <div className="header">
        <button
          className={`${mode === "order" ? "active" : ""}`}
          onClick={() => {
            onModeChange("order");
          }}
        >
          order
        </button>
        <button
          className={`${mode === "random" ? "active" : ""}`}
          onClick={() => {
            onModeChange("random");
          }}
        >
          random
        </button>
      </div>
      <Swiper
        className="swiper"
        loop={true}
        onActiveIndexChange={(swiper) => {
          if (mode === "order") {
            setIndex(swiper.activeIndex + 1);
          }
        }}
      >
        {wordList.map(({ word, translate, synonyms, id }) => {
          return (
            <SwiperSlide className="swiper-slide" key={id} watchSlidesProgress>
              <div className="card">
                <div className="card-content word">{word}</div>
                <div className="card-content translate">{translate}</div>
                <div className="card-content synonyms">
                  {synonyms.split(",").map((synonym, i) => (
                    <p key={i}>{synonym}</p>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {mode === "order" ? (
        <div className="progress">
          <span>
            {index}/{wordList.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default App;
