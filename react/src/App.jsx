import React from "react";

const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "";

const App = () => {
  return <div className="App">React页面 {BASE_NAME}</div>;
};

export default App;
