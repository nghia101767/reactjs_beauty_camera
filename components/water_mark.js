import { Text } from "react-konva";
const WaterMark = ({ title, w, h }) => (
  <Text
    x={w - 150}
    y={h - 30}
    text={title}
    fontSize={20}
    fill="white"
    fontFamily="Quicksand, sans-serif"
  />
);
export default WaterMark;
