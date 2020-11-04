const PreviewScene = ({ save, closePreview, imgPreview }) => (
  <div className="preview-scene">
    <button onClick={save} className="preview-save">
      <img
        styles={{ marginRight: "10px" }}
        src="/images/icon-dl-b.png"
        width={16}
        height={16}
      />{" "}
      Save
    </button>
    <button onClick={closePreview} className="preview-close">
      <img src="/images/icon-close.png" />
    </button>
    <img src={imgPreview} className="preview-img" />
    <div className="margin text-center">Share</div>
    <div className="margin text-center">
      <img
        className="icon-share icon-tw margin padding"
        src="/images/icon-tw.png"
      />
      <img
        className="icon-share icon-insta margin padding"
        src="/images/icon-insta.png"
      />
    </div>
  </div>
);
export default PreviewScene;
