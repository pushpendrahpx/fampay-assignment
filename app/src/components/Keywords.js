import { notification } from "antd";
import React, { useEffect, useState } from "react";
const Keywords = () => {
  const [api, contextHolder] = notification.useNotification();
  const [keywords, setKeywords] = useState([]);
  const fetchKeywords = async () => {
    try {
      let response = await fetch(
        "https://fampay-apis.pushpendrahpx.me/getAllKeywords"
      );
      const data = await response.json();
      setKeywords(data);
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
  return <div>{contextHolder}</div>;
};

export default Keywords;
