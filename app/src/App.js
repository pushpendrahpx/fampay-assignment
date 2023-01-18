import "./App.css";
import "antd/dist/reset.css";
import { Layout, Typography } from "antd";
import Keywords from "./components/Keywords";
import Snapshots from "./components/Snapshots";
import { useState } from "react";
const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

function App() {
  const [keywordSelected, setKeywordSelected] = useState("fampay");
  return (
    <div className="App h-full">
      <Layout className="h-full">
        <Header style={{ display: "grid", placeContent: "center" }}>
          <Title
            style={{
              color: "white",
              verticalAlign: "middle",
              padding: "10px 0 0 0",
            }}
            level={2}
          >
            Fampay Assignment
          </Title>
        </Header>
        <Layout>
          <Sider>
            {" "}
            <Keywords setKeywordSelected={setKeywordSelected} />{" "}
          </Sider>
          <Content>
            <Snapshots keywordSelected={keywordSelected} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
