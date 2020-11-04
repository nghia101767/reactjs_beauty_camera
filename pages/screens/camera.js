import React, { Component, useEffect } from "react";
import Webcam from "react-webcam";
import Head from "next/head";
import { Stage, Layer, Shape, Image, Text } from "react-konva";
import URLImage from "../../components/konva_url_image";
import ClamItem from "../../components/konva_clam_item";
import PreviewScene from "../../components/preview_scene";
import WaterMark from "../../components/water_mark";
import ClamBox from "../../components/clam_box";
import Toolbar from "../../components/toolbar";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "../../styles/camera.module.css";

const CameraScreen = () => {
  const appName = "Beauty Camera";
  const [w, setW] = React.useState(375);
  const [h, setH] = React.useState(812);
  const [isCaptureReview, setIsCaptureReview] = React.useState(false);
  const [winWidth, setWinWidth] = React.useState(375);
  const [winHeight, setWinHeight] = React.useState(812);
  const [loading, setLoading] = React.useState(true);
  // const ratio = 1.7776;
  //height 100% => calculate width
  useEffect(() => {
    setWinWidth(window.innerWidth);
    setWinHeight(window.innerHeight);
    setW(window.innerWidth);
    setH(window.innerHeight);
  });
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const stageRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);
  const [mirrored, setMirrored] = React.useState(false);
  const handleTakePhoto = React.useCallback((dataUri) => {
    setImgSrc(dataUri);
    setTimeout(() => {
      const imagePreview = document
        .getElementsByTagName("canvas")[0]
        .toDataURL("image/jpeg");
      setImgPreview(imagePreview);
    }, 100);
  });

  const handleTakePhotoAnimationDone = React.useCallback((dataUri) => {
    // Do stuff with the photo...
    console.log("takePhoto");
  });

  const handleCameraError = React.useCallback((error) => {
    console.log("handleCameraError", error);
  });

  const handleCameraStart = React.useCallback((stream) => {
    console.log("handleCameraStart");
  });

  const handleCameraStop = React.useCallback(() => {
    console.log("handleCameraStop");
  });

  const closePreview = () => {
    setImgPreview(null);
    setImgSrc(null);
  };
  const save = React.useCallback(() => {
    setIsCaptureReview(false);
    const link = document.createElement("a");
    link.setAttribute("download", `camera_beauty_${Date.now()}.jpg`);
    const url = imgPreview.replace(
      /^data:image\/[^;]/,
      "data:application/octet-stream;"
    );
    link.href = url;
    link.click();
    console.log("saved");
    closePreview();
  });

  const [showBoxClam, setShowBoxClam] = React.useState(false);
  const [pickup, setPickup] = React.useState([]);
  const toggleClam = () => {
    setShowBoxClam(!showBoxClam);
  };

  const clamSelector = React.useCallback((data) => {
    let tempPickup = [...pickup];
    const exist = pickup.findIndex((item) => item.id == data.id);
    if (exist !== -1) {
      tempPickup.splice(exist, 1);
      setPickup(tempPickup);
      return;
    }
    if (data.type != "frame") {
      setPickup([...pickup, data]);
      return;
    }
    if (pickup.length == 0) {
      setPickup([...pickup, data]);
      return;
    }
    if (tempPickup[0].type == "frame") {
      tempPickup.splice(0, 1, data);
    } else if (data.type == "frame") {
      tempPickup = [data, ...tempPickup];
    } else {
      tempPickup.push(data);
    }
    setPickup(tempPickup);
  });
  const clearClam = () => {
    // let temp = pickup.filter((item) => item.group != "clam");
    setPickup([]);
  };

  return (
    <div>
      <Head>
        <title>Beauty Camera</title>
      </Head>
      <main>
        {loading && (
          <div className="loader-box">
            <h1 style={{ marginTop: -200 }}>Beauty Camera</h1>
            <div style={{ height: 40 }}>
              <div className="loader">Loading...</div>
            </div>
          </div>
        )}
        <Camera
          className="demo-camera "
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          onTakePhotoAnimationDone={(dataUri) => {
            handleTakePhotoAnimationDone(dataUri);
          }}
          onCameraError={(error) => {
            handleCameraError(error);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={{ width: w, height: h }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          // isMaxResolution={true}
          isImageMirror={mirrored}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={true}
          sizeFactor={1}
          onCameraStart={(stream) => {
            handleCameraStart(stream);
          }}
          onCameraStop={() => {
            handleCameraStop();
          }}
        />
        <Stage
          ref={stageRef}
          className="konva-main"
          width={winWidth}
          height={winHeight}
        >
          <Layer>
            {imgSrc && (
              <URLImage
                src={imgSrc}
                width={w}
                height={h}
                x={0}
                y={0}
                filters={[Konva.Filters.Grayscale]}
              />
            )}
            {pickup.map((item, index) => (
              <ClamItem
                key={"clam-item-" + index}
                item={item}
                index={index}
                w={w}
                h={h}
              />
            ))}
            <WaterMark w={w} h={h} title={appName} />
          </Layer>
        </Stage>
        {!isCaptureReview && (
          <Toolbar
            mirrorChange={() => {
              setMirrored(!mirrored);
            }}
            toggleClam={toggleClam}
          />
        )}
        {imgPreview && imgSrc && (
          <PreviewScene
            save={save}
            imgPreview={imgPreview}
            closePreview={closePreview}
          />
        )}
        <ClamBox
          active={showBoxClam}
          toggle={toggleClam}
          listData={clamData}
          onSelect={clamSelector}
          onClear={clearClam}
        />
      </main>
    </div>
  );
};
export default CameraScreen;

const clamData = [
  {
    id: "data-1",
    type: "frame",
    group: "clam",
    thumb: "/assets/thumb/frame-2.png",
    top: { url: "/assets/frames/week-top.png", height: 75 },
    bottom: { url: "/assets/frames/week-bottom.png", height: 150 },
    content_type: "image/png",
  },
  {
    id: "data-2",
    type: "frame",
    group: "clam",
    thumb: "/assets/thumb/frame-1.png",
    top: { url: "/assets/frames/frame-1-top.png", height: 75 },
    bottom: { url: "/assets/frames/frame-1-bottom.png", height: 150 },
    content_type: "image/png",
  },
  {
    id: "data-3",
    type: "frame",
    group: "clam",
    thumb: "/assets/thumb/frame-3.png",
    full: { url: "/assets/frames/frame-3-full.png" },
    content_type: "image/png",
  },
  {
    id: "sticker-1-1",
    type: "sticker_1",
    group: "clam",
    thumb: "/assets/thumb/thumb-1.png",
    sticker: { url: "/assets/thumb/thumb-1.png", width: 150, height: 150 },
    content_type: "image/png",
  },
  {
    id: "sticker-1-2",
    type: "sticker_1",
    group: "clam",
    thumb: "/assets/thumb/thumb-2.png",
    sticker: { url: "/assets/thumb/thumb-2.png", width: 150, height: 150 },
    content_type: "image/png",
  },
  {
    id: "sticker-1-3",
    type: "sticker_1",
    group: "clam",
    thumb: "/assets/thumb/thumb-3.png",
    sticker: { url: "/assets/thumb/thumb-3.png", width: 150, height: 150 },
    content_type: "image/png",
  },
  {
    id: "sticker-1-4",
    type: "sticker_1",
    group: "clam",
    thumb: "/assets/thumb/thumb-4.png",
    sticker: { url: "/assets/thumb/thumb-4.png", width: 150, height: 150 },
    content_type: "image/png",
  },
  {
    id: "sticker-1-5",
    type: "sticker_1",
    group: "clam",
    thumb: "/assets/thumb/thumb-5.png",
    sticker: { url: "/assets/thumb/thumb-5.png", width: 150, height: 150 },
    content_type: "image/png",
  },
  {
    id: "sticker-1-6",
    type: "sticker_1",
    group: "clam",
    thumb: "/assets/thumb/thumb-6.png",
    sticker: { url: "/assets/thumb/thumb-6.png", width: 150, height: 150 },
    content_type: "image/png",
  },
];
