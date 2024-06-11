import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/srore/store";
import "./App.css";
import Layout from "./Layout";
import Router from "./shared/Router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <Router />
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
