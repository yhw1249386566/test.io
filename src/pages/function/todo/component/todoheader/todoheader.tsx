/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from "react"
import { observer, inject } from "mobx-react"
import React from 'react';
import { action } from "mobx";
import Style from "./todoheader.less";

const TodoHeader = inject('store')(observer(
    (props: any) => {
        // BUG：快速刷新页面(F5) 会导致第2次还未重新存储Todos到本地数据时，就获取本地数据，从而导致最终本地数据为空
        const currentLocalstorageTodosCopy = localStorage.getItem('todoscopy') ?? '[]' // 使用 setTImtout 模拟延迟时，需要先将数据存储到变量，然后使用变量作为数据来源，否则 setTimeout 中获取不到
        const { store } = props;
        useEffect(() => { document.querySelector('#mask')?.setAttribute('style', 'display:block') }, [1]) // 开启蒙版，禁用所有元素。
        useEffect(() => {
            let mask = document.querySelector('#mask')
            // setTimeout(action(() => {
            store.todoscopy = store.parsingJSON(currentLocalstorageTodosCopy) // 取出本地数据赋值给 store.todos
            mask?.setAttribute('style', 'display:none') // 关闭蒙版。
            // }), 2000);
            // setTimeout(() => { document.getElementById('active')?.click() }, 2001); // 点击 All 按钮，使得 todoscopy 赋值给 todos
            document.getElementById('active')?.click()
        }, [1]); // 取出本地数据并渲染。
        return (
            <header className={Style.todoheader}>
                <HeaderInputForm />  {/* logo+输入框+添加按钮+输入框阴影 */}
                <ButtonAndLogo />   {/* 完成所有/全未完成+清空未完成 */}
            </header >
        )
    }
))

// logo+输入框+添加按钮+输入框阴影
const HeaderInputForm = inject('store')(observer(
    (props: any) => {
        const { store } = props
        const [inputValueState, setInputValueState] = useState("");
        const handleChange = (inputValueState: any) => setInputValueState(inputValueState)  // 使 React 代理受控组件
        const handleSubmit = (e: any) => { // 将用户输入的数据存储
            e.preventDefault() // 阻止 Submit 的默认动作
            // store.createTodo('todos', inputValueState)// 将用户输入的数据存入 new Todo(inputValue)
            store.createTodo('todoscopy', inputValueState)
            setInputValueState("") // 清空 input 的值
            // 获取 id=active 的元素，防止用户在已完成/未完成任务界面添加待办事项时，导致当前界面增加元素
            document.getElementById('active')?.click();
        }
        {/* logo+输入框+添加按钮+输入框阴影 */ }
        return (
            <form onSubmit={action(handleSubmit)} className={Style.todoheaderform} >
                <p className={Style.todoheaderlogo}>
                    <svg className={Style.addtodoicon} aria-hidden="true" onClick={action(handleSubmit)}>
                        <use xlinkHref="#icon--to-do" />
                    </svg>
                </p>
                <div>
                    <input
                        type="text"
                        maxLength={40}
                        onChange={action(e => handleChange(e.target.value))}
                        value={inputValueState}
                        placeholder="your todolist"
                    />
                    <svg className={Style.addicon} aria-hidden="true" onClick={action(handleSubmit)} style={{ display: "none" }}>
                        <use xlinkHref="#icon-add" />
                    </svg>
                    <div className={Style.stereo} />
                </div>
            </form>
        )
    }
))

// 完成所有/全未完成+清空未完成 按钮
const ButtonAndLogo = inject('store')(observer(
    (props: any) => {
        const { store } = props;
        const _build = () => ( // 渲染切换按钮 完成所有/全未完成
            store.getCurrentCompletedTask.length === 0 // 没有任何 1 个完成事项
                ? <CompleteAll />
                : store.getCurrentCompletedTask.length === store.todos.length // 完成任务个数 === 总任务数
                    ? <AllUnfinish />
                    : <CompleteAll />
        )
        // 清空已完成时，就将本地的已完成任务一起清空（重存）
        useEffect(() => { store.storageTodos('todoscopy', store.todoscopy) })
        return (
            <div className={Style.todoheaderdiv}>
                <div className={Style.switchonoffbox}>{_build()}</div>
                <div className={Style.deleteallbox}>
                    <svg className={Style.deleteallicon} aria-hidden="true" ><use xlinkHref="#icon-qingkong1" /></svg>
                    <span onClick={action(() => store.clearFinished())}>清空已完成</span>
                </div>
            </div>
        )
    }
))

const CompleteAll = inject('store')(observer(
    (props: any) => (
        <div>
            <svg className={Style.completeallicon} aria-hidden="true" >
                <use xlinkHref="#icon-wancheng" />
            </svg>
            <span
                onClick={action(() => props.store.changeAllTodoListCompleted = ['todos', 'todoscopy'])}>
                完成所有
            </span>
        </div>
    )
))

const AllUnfinish = inject('store')(observer(
    (props: any) => (<div>
        <svg className={Style.allunfinishicon} aria-hidden="true">
            <use xlinkHref="#icon-weiwancheng" />
        </svg>
        <span onClick={action(() =>
            props.store.changeAllTodoListUncompleted = ['todos', 'todoscopy'])}>
            全未完成
        </span>
    </div>)
))

export default TodoHeader
