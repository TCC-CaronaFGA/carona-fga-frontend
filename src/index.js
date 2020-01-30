import React from "react";
import ReactDOM from "react-dom";
import RootRoutes from "./components/Routes";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "rootPersist",
  storage,
  blacklist: []
};

const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStoreWithMiddleware(
  persistedReducer,
  composeWithDevTools()
);

const persistor = persistStore(store);

const Root = () => <RootRoutes />;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
