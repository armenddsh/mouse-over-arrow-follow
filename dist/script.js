function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Arrow(props) {
  console.log(props);
  const ref = React.useRef(null);
  const [deg, setDeg] = React.useState(0);

  const color = React.useMemo(() => {
    return getRandomColor();
  }, []);

  React.useEffect(() => console.log(deg), [deg]);

  React.useEffect(() => {
    const current = ref.current;
    const rect = current.getBoundingClientRect();

    let a = props.x - rect.x;
    let b = props.y - rect.y;
    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    let degree = 0;

    if (b < 0 && a < 0) {
      const arcsin = Math.asin(a / c);
      degree = arcsin * (180 / Math.PI) - 90;
    } else if (b < 0 && a > 0) {
      const arcsin = Math.asin(a / c);
      degree = arcsin * (180 / Math.PI) - 90;
    } else if (b > 0 && a > 0) {
      const arcsin = Math.asin(b / c);
      degree = arcsin * (180 / Math.PI);
    } else if (b > 0 && a < 0) {
      const arcsin = Math.asin(b / c) * -1;
      degree = arcsin * (180 / Math.PI) - 180;
    }
    setDeg(degree);
  }, [props, deg]);
  console.log(color);
  return /*#__PURE__*/(
    React.createElement("div", { ref: ref, class: "arrow", style: { transform: `rotate(${deg}deg)` } }, /*#__PURE__*/
    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      style: { "fill": color, "color": color },
      "enable-background": "new 0 0 24 24",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: "#000000" }, /*#__PURE__*/

    React.createElement("rect", { fill: "none", height: "24", width: "24" }), /*#__PURE__*/
    React.createElement("path", { d: "M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" }))));



}

function Arrows(props) {
  const count = 100;
  const items = Array(count).fill( /*#__PURE__*/React.createElement(Arrow, { x: props.x, y: props.y, deg: 30 }));
  return /*#__PURE__*/React.createElement("div", { className: "arrows" }, items);
}

function App() {
  const [positionX, setPositionX] = React.useState(0);
  const [positionY, setPositionY] = React.useState(0);

  React.useEffect(() => {
    document.addEventListener("mousemove", event => {
      setPositionX(prev => event.x);
      setPositionY(prev => event.y);
    });
    () => {
      document.removeEventListener("mousemove");
    };
  }, []);
  return /*#__PURE__*/React.createElement(Arrows, { x: positionX, y: positionY });
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));