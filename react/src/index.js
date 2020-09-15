import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

function render() {
  return ReactDOM.render(<App />, document.getElementById('root')) 
}

// 子应用独立运行时，直接挂载
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
  bootstrap只会在子应用初始化的时候调用一次，下次子应用重新进入时会直接调用mount钩子函，
  不会再重复触发bootstrap。
  通常我们会在这里做一些全局变量的初始化，比如不会在unmount阶段被销毁的应用级别缓存等
 */
export async function bootstrap() {
  console.log("ReactMicroApp bootstraped");
}

/**
  应用每次进入都会调用mount方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("ReactMicroApp mount", props);
  render(props);
}

/**
  应用每次切出/卸载会调用的方法，通常我们在这里会卸载子应用的应用实例
 */
export async function unmount() {
  console.log("ReactMicroApp unmount");
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}