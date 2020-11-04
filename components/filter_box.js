import React from "react";
const FilterBox = ({ active, toggle, listData, onSelect, onClear }) => {
  React.useEffect(() => {
    setTabData(_tabData);
  });
  const [tabData, setTabData] = React.useState([]);
  const [filter, setFilter] = React.useState("frame");
  const activeMenu = React.useCallback((id) => {
    let tempData = tabData.map((item) => {
      let newItem = item;
      newItem.active = item.id === id;
      if (item.id === id) {
        setFilter(item.filter);
      }
      return newItem;
    });
    setTabData(tempData);
  });

  return (
    <div className={"box-clam" + (active ? " active" : "")}>
      <div onClick={toggle} className="close"></div>
      <div className="container">
        <div className="menu">
          <button onClick={onClear} className="btn-clear-clam">
            <img src="/images/icon-delete.png" width={25} height={25} />
          </button>
          {tabData.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                activeMenu(item.id);
              }}
              className={item.active ? "btn-tab-item active" : "btn-tab-item"}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="content">
          {listData
            .filter((item) => item.type === filter)
            .map((data, index) => {
              return (
                <button
                  key={"clam-" + index}
                  onClick={() => onSelect(data)}
                  className="thumb"
                >
                  <img src={data.thumb} />
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FilterBox;

const _tabData = [
  {
    id: "tab_frame",
    group: "clam",
    title: "Frames",
    filter: "frame",
    active: true,
  },
  {
    id: "tab_ticker_1",
    group: "clam",
    title: "Ticker 1",
    filter: "sticker_1",
    active: false,
  },
  {
    id: "tab_ticker_2",
    group: "clam",
    title: "Ticker 2",
    filter: "sticker_2",
    active: false,
  },
  {
    id: "tab_ticker_3",
    group: "clam",
    title: "Ticker 3",
    filter: "sticker_3",
    active: false,
  },
  {
    id: "tab_ticker_4",
    group: "clam",
    title: "Ticker 4",
    filter: "sticker_4",
    active: false,
  },
  {
    id: "tab_ticker_5",
    group: "clam",
    title: "Ticker 5",
    filter: "sticker_5",
    active: false,
  },
  {
    id: "tab_ticker_6",
    group: "clam",
    title: "Ticker 6",
    filter: "sticker_6",
    active: false,
  },
  {
    id: "tab_ticker_7",
    group: "clam",
    title: "Ticker 7",
    filter: "sticker_7",
    active: false,
  },
  {
    id: "tab_ticker_8",
    group: "clam",
    title: "Ticker 8",
    filter: "sticker_8",
    active: false,
  },
  {
    id: "tab_ticker_9",
    group: "clam",
    title: "Ticker 9",
    filter: "sticker_9",
    active: false,
  },
];
