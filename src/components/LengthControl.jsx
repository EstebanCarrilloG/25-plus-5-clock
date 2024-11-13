export default function LengthControl({ type, value, handleBreak, start }) {
  return (
    <div className="length-control">
      <div id={type.toLowerCase() + "-label"}>{type} Length</div>
      <button
        onClick={() => !start && handleBreak(value === 1 ? 1 : value - 1, type)}
        className="btn-level"
        id={type.toLowerCase() + "-decrement"}
        value="-"
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div className="btn-level" id={type.toLowerCase() + "-length"}>
        {value}
      </div>
      <button
        onClick={() =>
          !start && handleBreak(value === 60 ? 60 : value + 1, type)
        }
        className="btn-level"
        id={type.toLowerCase() + "-increment"}
        value="+"
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
    </div>
  );
}
