import { useEffect, useState } from "react";
import "./App.css";
import IntroScreen from "./components/IntroScreen";
import image from "./assets/image.jpg";
import errorSound from "./assets/error-sound.mp3";
import backgroundMusic from "./assets/background-music.mp3";
import Gallery from "./components/Gallery";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [noMessage, setNoMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [audio] = useState(new Audio(backgroundMusic));

  useEffect(() => {
    audio.volume = 0.2;
    audio.loop = true;
  }, [audio]);

  const startValentineScreen = () => {
    setShowIntro(false);
    audio.play().catch((err) =>
      console.log("เกิดข้อผิดพลาดในการเล่นเสียง:", err)
    );
    generateFloatingHearts();
    setTimeout(() => setShowProposal(true), 1000);
  };

  const generateFloatingHearts = () => {
    const heartsArray = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 5 + 3}s`,
      delay: `${Math.random() * 3}s`,
      size: `${Math.random() * 20 + 10}px`,
    }));
    setHearts(heartsArray);
  };

  const messages = [
    "คิดดี ๆ นะ 😏 นี่ยังไม่ใช่คำตอบที่ถูกต้อง",
    "แน่ใจเหรอ 🥺 นี่ยังไม่ใช่คำตอบที่ถูกต้อง",
    "อย่ากดเลย 💔 นี่ยังไม่ใช่คำตอบที่ถูกต้อง",
    "เรามันไม่ดีพอใช่ไหม... นี่ยังไม่ใช่คำตอบที่ถูกต้อง 😞",
    "โอเค ๆ เข้าใจแล้ว เดี๋ยวรอคำตอบที่ถูกต้องก็ได้ 🥹"

  ];

  const moveNoButton = () => {
    setNoPosition({
      top: Math.random() * 80 + "%",
      left: Math.random() * 80 + "%",
    });
  };

  const handleNoClick = () => {
    moveNoButton();
    setNoMessage(messages[Math.floor(Math.random() * messages.length)]);
    setShowPopup(true);
    new Audio(errorSound).play();
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleYesClick = () => {
    const heartsContainer = document.createElement("div");
    heartsContainer.classList.add("hearts-click-container");
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 50; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart-click");
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
      heart.style.width = `${Math.random() * 30 + 10}px`;
      heart.style.height = heart.style.width;
      heartsContainer.appendChild(heart);
    }

    setTimeout(() => {
      heartsContainer.remove();
      setShowFinalMessage(true); // แสดงหน้าหวานก่อน
    }, 4000);
  };

  return (
    <>
      {showIntro ? (
        <IntroScreen startValentineScreen={startValentineScreen} />
      ) : showGallery ? (
        <Gallery />
      ) : (
        <>
          <div className="hearts-background">
            {hearts.map((heart) => (
              <div
                key={heart.id}
                className="heart-floating"
                style={{
                  left: heart.left,
                  animationDuration: heart.animationDuration,
                  animationDelay: heart.delay,
                  width: heart.size,
                  height: heart.size,
                }}
              ></div>
            ))}
          </div>

          {!showFinalMessage ? (
            <div className={`container ${showProposal ? "show" : ""}`}>
              <h1>Will u be my Valentine?❤️</h1>
              <img src={image} alt="วาเลนไทน์" className="photo" />

              <div className="buttons">
                <button className="yes" onClick={handleYesClick}>
                  Yes ❤️
                </button>

                <button
                  className="no"
                  style={{
                    position: "absolute",
                    top: noPosition.top,
                    left: noPosition.left,
                  }}
                  onMouseEnter={moveNoButton}
                  onClick={handleNoClick}
                >
                  No!! 💔
                </button>
              </div>

              {showPopup && (
                <div className="popup">
                  <p>{noMessage}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="final-message">
              <p>💖 ขอบคุณน้าาาที่มาเป็นวาเลนไทน์ของเค้า 💖</p>
              <p>💖 เค้ารักเธอมากๆน้าาา โบว์ 💖</p>

              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2g1NWluNjM0aHoxNDFubjlmZjBhMjl3emRuZmo3MHI5bXFwbXU0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oriO6qJiXajN0TyDu/giphy.gif"
                alt="วาเลนไทน์"
                className="final-gif"
              />

              <button
                className="gallery-button"
                onClick={() => setShowGallery(true)}
              >
                ดูแกลลอรี่ของเรากัน 💕
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
