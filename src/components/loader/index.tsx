import "./style.css";
export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loading-text">
        <h1>
          Loading
          <span className="dot-one"> .</span>
          <span className="dot-two"> .</span>
          <span className="dot-three"> .</span>
        </h1>
      </div>
    </div>
  );
}
