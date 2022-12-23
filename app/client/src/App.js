import "./App.css";
import { Poll } from "./components";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  background-color: #ecf0f1;
  height: 100vh;
`;

function App() {
  return (
    <Layout>
      <Poll />
    </Layout>
  );
}

export default App;
