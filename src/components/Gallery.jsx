import "./Gallery.css";

import pic1 from "../assets/pic1.jpg";
import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";
import v4 from "../assets/v4.mp4";
import v5 from "../assets/v5.mp4";
import v6 from "../assets/v6.mp4";

const Gallery = () => {

  const videos = [v1, v2, v3, v4, v5, v6];

  return (
    <div className="gallery-wrapper">

      <h1 className="gallery-title">Bowlentine🤍</h1>

      <div className="circle-container">

        {/* รูปตรงกลาง */}
        <div className="center-image">
          <img src={pic1} alt="memory" />
        </div>

        {/* วิดีโอรอบวง */}
        <div className="orbit">
          {videos.map((video, index) => (
            <div
              className="orbit-item"
              key={index}
              style={{ "--i": index }}
            >
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          ))}
        </div>

      </div>

      {/* พื้นที่ข้อความด้านล่าง */}
      <div className="bottom-text">
        <p>
          เค้าชอบทุกช่วงเวลาที่อยู่ด้วยกันกับเธอนะมันทำให้เค้าสบายใจมากๆอยากอยู่กับเธอแบบนี้ไปเรื่อยๆเลยย 💖
        </p>
      </div>

    </div>
  );
};

export default Gallery;
