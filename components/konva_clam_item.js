import React from "react";
import URLImage from "./konva_url_image";
const ClamItem = ({ item, index, w, h }) => (
  <>
    {item.top && (
      <URLImage
        key={"clam-draw-top" + index}
        src={item.top.url}
        width={item.top.width ? item.top.width : w}
        x={item.top.x ? item.top.x : 0}
        y={item.top.y ? item.top.y : 0}
        height={item.top.height}
      />
    )}
    {item.bottom && (
      <URLImage
        key={"clam-draw-bottom" + index}
        src={item.bottom.url}
        width={item.bottom.width ? item.bottom.width : w}
        x={item.bottom.x ? item.bottom.x : 0}
        y={item.bottom.y ? item.bottom.y : h - item.bottom.height}
        height={item.bottom.height}
      />
    )}
    {item.full && (
      <URLImage
        ey={"clam-draw-full" + index}
        src={item.full.url}
        width={item.full.width ? item.full.width : w}
        x={item.full.x ? item.full.x : 0}
        y={item.full.y ? item.full.y : 0}
        height={item.full.height ? item.full.height : h}
      />
    )}
    {item.sticker && (
      <URLImage
        draggable={true}
        ey={"clam-draw-sticker" + index}
        src={item.sticker.url}
        width={item.sticker.width ? item.sticker.width : w}
        x={item.sticker.x ? item.sticker.x : (w - item.sticker.width) / 2}
        y={item.sticker.y ? item.sticker.y : (h - item.sticker.height) / 2}
        height={item.sticker.height ? item.sticker.height : h}
      />
    )}
  </>
);
export default ClamItem;
