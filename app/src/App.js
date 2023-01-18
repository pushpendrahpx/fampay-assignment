import "./App.css";
import "antd/dist/reset.css";
import { Layout, Typography } from "antd";
import Keywords from "./components/Keywords";
const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

function App() {
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
            <Keywords />{" "}
          </Sider>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
