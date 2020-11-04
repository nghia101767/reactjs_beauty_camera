const Toolbar = ({ toggleClam, capture, mirrorChange }) => (
  <>
    <button className="icon-toolbar icon-top icon-my-page">
      <img src="/images/icon-mypage.png" />
    </button>
    <button className="icon-toolbar icon-top icon-square icon-img">
      <img src="/images/icon-img-w.png" />
    </button>
    <button
      onClick={mirrorChange}
      className="icon-toolbar icon-top icon-square icon-change"
    >
      <img src="/images/icon-change.png" />
    </button>
    <button className="icon-toolbar icon-top icon-square icon-hatena">
      <img src="/images/icon-hatena.png" />
    </button>
    <button onClick={toggleClam} className="icon-toolbar icon-bottom icon-clam">
      <img src="/images/icon-stamp.png" />
    </button>

    <button className="icon-toolbar icon-bottom icon-filter">
      <img src="/images/icon-filter.png" />
    </button>

    <button className="icon-toolbar icon-bottom icon-text">
      <img src="/images/icon-txt.png" />
    </button>
  </>
);
export default Toolbar;
