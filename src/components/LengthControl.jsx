import "../styles/lengthControl.css";

export default function LengthControl({ type, value, handleTime, start }) {
  return (
    <div className="length-control">
      <div className="label" id={type.toLowerCase() + "-label"}>{type} Length</div>
      <div className="btn-group">
      <button
        onClick={() => !start && handleTime(value === 1 ? 1 : value - 1, type)}
        className="btn-level"
        id={type.toLowerCase() + "-decrement"}
        value="-"
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <span className="level" id={type.toLowerCase() + "-length"}>
        {value}
      </span>
      <button
        onClick={() =>
          !start && handleTime(value === 60 ? 60 : value + 1, type)
        }
        className="btn-level"
        id={type.toLowerCase() + "-increment"}
        value="+"
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
      </div>
    </div>
  );
}
