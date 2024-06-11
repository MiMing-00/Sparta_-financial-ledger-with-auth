import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/srore/store";
import "./App.css";
import Layout from "./Layout";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
