import React, { useEffect, useState } from "react";
import {
  notification,
  Radio,
  Tabs,
  Card,
  Avatar,
  Tooltip,
  Typography,
  Divider,
} from "antd";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  EditOutlined,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const { Title } = Typography;
const SnapshotItem = ({ item, keywordSelected }) => {
  console.log();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <Title level={5}>Keyword Selected - {keywordSelected}</Title>
      <Title level={5}>
        {new Date(item.timestamp).toDateString()} -{" "}
        {new Date(item.timestamp).toTimeString()}
      </Title>
      <Divider />
      {item?.data.items?.map((eachItem, eachIndex) => {
        return (
          <a href={"https://www.youtube.com/watch?v=" + eachItem.id.videoId}>
            <Card
              key={eachIndex}
              style={{ width: 300, margin: "10px auto" }}
              cover={
                <img
                  alt="example"
                  src={eachItem.snippet.thumbnails.default.url}
                />
              }
            >
              <Meta
                avatar={
                  <Avatar src={eachItem.snippet.thumbnails.default.url} />
                }
                title={
                  <Tooltip title={eachItem.snippet.title}>
                    {eachItem.snippet.title}
                  </Tooltip>
                }
                description={eachItem.snippet.description}
              />
            </Card>
          </a>
        );
      })}
    </div>
  );
};
const Snapshots = ({ keywordSelected }) => {
  const [api, contextHolder] = notification.useNotification();
  const [snapshots, setSnapshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSnapshots = async () => {
    try {
      let response = await fetch(
        "https://fampay-apis.pushpendrahpx.me/document/" + keywordSelected
      );
      const data = await response.json();
      console.log(data.snapshots);
      let arr = [];
      for (let i = 0; i < data.snapshots.length; i++) {
        arr.push({
          label: data.snapshots[i].timestamp,
          key: data.snapshots[i].timestamp,
          disabled: false,
          children: (
            <SnapshotItem
              keywordSelected={keywordSelected}
              item={data.snapshots[i]}
            />
          ),
        });
      }
      setIsLoading(false);
      setSnapshots(arr);
      api.info({
        message: `Snapshots fetched`,
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
    fetchSnapshots();

    setIsLoading(true);
  }, [keywordSelected]);

  return (
    <div style={{ height: "100vh" }}>
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        tabPosition={"top"}
        style={{ height: 220 }}
        items={snapshots}
      />

      {isLoading ? <LoadingOutlined style={{ fontSize: "60px" }} /> : ""}
    </div>
  );
};

export default Snapshots;
