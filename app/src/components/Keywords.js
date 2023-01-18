import { notification, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Keywords = ({ setKeywordSelected }) => {
  const [items, setItems] = useState([
    getItem("All Keywords", "g1", null, [], "group"),
    getItem(
      "About Developer",
      "g2",
      null,
      [getItem("Portfolio", "3")],
      "group"
    ),
  ]);
  const [api, contextHolder] = notification.useNotification();
  const [keywords, setKeywords] = useState([]);
  const fetchKeywords = async () => {
    try {
      let response = await fetch(
        "https://fampay-apis.pushpendrahpx.me/getAllKeywords"
      );
      const data = await response.json();
      setKeywords(data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(getItem(data[i].query, "g" + i, null));
      }
      setItems((prev) => {
        return [
          getItem("All Keywords", "g1", null, arr, "group"),
          getItem(
            "About Developer",
            "g2",
            null,
            [getItem("Portfolio", "3")],
            "group"
          ),
        ];
      });
      api.info({
        message: `Keywords fetched`,
        placement: "topRight",
      });
    } catch (error) {
      api.info({
        message: `Error Occurred`,
        description: <span>{`${error}`}</span>,
        placement: "topRight",
      });
    }
  };
  useEffect(() => {
    fetchKeywords();
  }, []);

  const onClick = (value) => {
    setKeywordSelected(value.domEvent.target.innerText);
  };
  return (
    <>
      {contextHolder}
      <Menu
        onClick={onClick}
        style={{ width: 200, height: "100vh" }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default Keywords;
