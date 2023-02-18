/* eslint-disable */
// @ts-nocheck
import React from "react"
import { observer, Provider } from "mobx-react"
import TodoHeader from "./component/todoheader/todoheader"
import TodoView from "./component/todoview/todoview"
import TodoFooter from "./component/todofooter/todofooter"
import Store from "./store"
import Style from "./index.less";
import './iconfont.js'

const TodoList = observer(
  () => (
    <div className={Style.todolistbox} >
      <TodoHeader />
      <TodoView />
      <TodoFooter />
      <div className={Style.mask} id="mask" />
    </div>
  )
)
export default () => (
  <Provider store={Store}>
    {/* 单纯的指这里：任何注入 store 的组件，不会因为 store 的改变而重新渲染，
        除非你有其他操作，如：在其他组件中 observer 了那个组件等*/}
    <TodoList />
  </Provider>
)