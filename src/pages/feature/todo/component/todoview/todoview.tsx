/* eslint-disable */
// @ts-nocheck
import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'
import Style from './todoview.less'
import { useEffect } from 'react'
import { useState } from 'react'
import classNames from 'classnames/bind'
let cx = classNames.bind(Style)

const TodoView = inject((allStores) => ({
    todos: allStores.store.todos,
    todoscopy: allStores.store.todoscopy,
    removeTodo: allStores.store.removeTodo,
}))(
    observer((props: any) => {
        const { todos, todoscopy, removeTodo } = props
        const handleDeleteClick = (todo, index) => {
            // 点击删除时，删除对应的待办
            removeTodo('todos', todo)
            removeTodo('todoscopy', todoscopy[index])
        }
        const todoItem = todos.map(
            (
                todo,
                index, // 渲染每条待办事项
            ) => (
                <li key={todo.id}>
                    <TodoItem todo={todo} index={index} />
                    <svg
                        className={Style.deletetodoicon}
                        aria-hidden='true'
                        onClick={action(() => {
                            handleDeleteClick(todo, index)
                        })}
                    >
                        <use xlinkHref='#icon-weiwancheng' />
                    </svg>
                </li>
            ),
        )
        return <div className={Style.todoview}>{todoItem}</div>
    }),
)

// 复选框 + 待办内容 当 TodoView 重新渲染时，该子组件也将重新渲染
const TodoItem = inject((allStores) => ({
    todoscopy: allStores.store.todoscopy,
    todos: allStores.store.todos,
    removeTodo: allStores.store.removeTodo,
    storageTodos: allStores.store.storageTodos,
}))(
    observer((props: any) => {
        const { todo, index, todoscopy, todos, removeTodo, storageTodos } =
            props
        const [userChangeValue, setUserChangeValue] = useState('')
        const handleChange = (changValue: string) =>
            setUserChangeValue(changValue) // React 代理受控组件
        const handleCheckboxChange = () => {
            // todoscopy[index].finished = !todoscopy[index].finished // 将 todoscopy 中和当前 todo 对应的 finished 取反
            todo.finished = !todo.finished // 将 todoscopy 中和当前 todo 对应的 finished 取反
            document.getElementById('active')?.click() //由于这里我们有模拟点击 id=active，所以会使得 todoscopy 中的数据赋值给 todos
        }
        const handleOnblur = (todo: any) => {
            // 用户输入框失去焦点时，删除空待办。
            removeTodo('todos', todo)
            removeTodo('todoscopy', todoscopy[index])
        }
        useEffect(() => {
            setUserChangeValue(todo.userInputValue)
        }, [1]) // 挂载完成时将已有数据渲染到每条输入框中
        useEffect(() => {
            // 实时更新用户输入值并存入本地（先更新后存）
            todo.userInputValue = userChangeValue
            /**Bug:当你处于已完成/未完成界面时，由于我们这里是传入的索引（假设为0），所以在已完成/未完成界面改变第1个 todo 值时
             * todoscopy[0] 的值始终也会改变；但同时我们这里也让 todo 改变（如同 todos[0]），可是对于 todoscopy 和 todos 来说，它们在已完成/未完成界面时，值是不同的，
             * 这就会造成 todos[0] 和 todoscopy[0] 映射两个数据，就会导致我们在已完成界面/未完成界面更改索引为 0 的值时，使得两个不同的数据改变
             * 最终就会造成其中一方的数据在我们不想改变的情况下改变，数据不统一的情况。
             */
            // todoscopy[index]
            //     ? todoscopy[index].userInputValue = userChangeValue // 将对应的 todoscopy.userInputValue 改变
            //     : null
        })
        useEffect(() => {
            storageTodos('todoscopy', todoscopy)
        })
        const classNameChecbox = cx({
            // 当复选框被勾选时，添加 class
            circularcheck_checked: todo.finished,
            circularcheck: true,
        })
        return (
            <>
                <input // 复选框
                    className={classNameChecbox}
                    id={todo.id}
                    type='checkbox'
                    onChange={action(handleCheckboxChange)}
                    checked={todo.finished}
                />
                <textarea // 显示待办事项
                    className={Style.todocontent}
                    maxLength={40}
                    rows={4}
                    value={userChangeValue}
                    onChange={action((e: any) => handleChange(e.target?.value))}
                    onKeyDown={(e) =>
                        e.key === 'Enter' ? e.preventDefault() : null
                    } // 禁止回车
                    onBlur={
                        !userChangeValue
                            ? action(() => handleOnblur(todo))
                            : null
                    } // 删除空待办
                />
                <TodoTime todo={props.todo} /> {/* 显示已创建时间 + 到期时间 */}
            </>
        )
    }),
)

interface IPropsTodoTime {
    todo: any
    todoscopy: any
    storageTodos: any
}
// 已创建时间 + 到期时间 组件
const TodoTime = inject((allStores) => ({
    todos: allStores.store.todos,
    todoscopy: allStores.store.todoscopy,
    storageTodos: allStores.store.storageTodos,
}))(
    observer((props: IPropsTodoTime) => {
        const { todo, todoscopy, storageTodos } = props
        // 有关 已创建时间 + 到期时间
        let todoCreatedTime = Date.now() / 1000 / 60 - todo.id / 1000 / 60 // todo 已创建时间（min）
        const [showTodoCreatedTime, setShowTodoCreatedTime] = useState(0) // 显示已创建时间（s/m/h/day）
        const [duetotime, setDueToTime] = useState('1') // 用户设置的天数，默认 1 天
        const [showIsDue, setShowIsDue] = useState('') // 提示用户 todo 是否过期
        const classNameHourglass = cx({
            // 设置差 1 小时 todo 即将过期时沙漏的 class
            isAboutToExpire: duetotime * 24 * 60 - todoCreatedTime <= 60,
            timehourglass: true,
        })
        const classNameTodoCreatedTime = cx({
            // 设置即将到期和已过期的‘已创建时间’的颜色
            willExpire: duetotime * 24 * 60 - todoCreatedTime <= 60,
            expiredL: duetotime * 24 * 60 - todoCreatedTime <= 0,
            countdown: true,
        })
        const handleDueToTimeChange = (e: any) =>
            setDueToTime(
                e?.target?.value?.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, ''),
            ) // 只能输入数字
        const displayTodoCreatedTime = () => {
            // 显示 Todo 已创建时间
            todoCreatedTime = Date.now() / 1000 / 60 - todo.id / 1000 / 60 // todo 已创建时间（min）
            todoCreatedTime * 60 > 0 && todoCreatedTime * 60 < 60 // 已创建时间 > 0 秒 且 < 60 秒
                ? setShowTodoCreatedTime(
                      `已创建 ${(todoCreatedTime * 60).toFixed(0)} 秒`,
                  )
                : todoCreatedTime < 60 // 创建时间是否 > 60 分钟
                ? setShowTodoCreatedTime(
                      `已创建 ${todoCreatedTime.toFixed(0)} 分钟`,
                  )
                : todoCreatedTime < 1440 // 已创建时间是否大于 1 天
                ? setShowTodoCreatedTime(
                      `已创建 ${(todoCreatedTime / 60).toFixed(0)} 小时`,
                  )
                : todoCreatedTime < 525600 // 创建时间是否大于 1 年
                ? setShowTodoCreatedTime(
                      `已创建 ${(todoCreatedTime / 60 / 24).toFixed(0)} 天`,
                  )
                : setShowTodoCreatedTime(
                      `已创建 ${(todoCreatedTime / 60 / 24 / 365).toFixed(
                          0,
                      )} 年`,
                  )
        }
        const displayTodoDueToTime = () => {
            // 显示 Todo 到期时间
            // 用户输入待办事项持续的天数（转为min） - 已创建时间  = 是否过期
            let dueTimeMin = duetotime * 24 * 60 - todoCreatedTime // 是否过期（min/h/s）指的是还剩总的多少 min/h/s 过期
            let [dueTimeHour, dueTimeDay, dueTiemYear] = [
                dueTimeMin / 60,
                dueTimeMin / 60 / 24,
                dueTimeMin / 60 / 24 / 365,
            ]
            dueTimeMin < 0
                ? setShowIsDue('已过期')
                : dueTimeMin < 60
                ? setShowIsDue(`还剩 ${dueTimeMin.toFixed(0)} 分钟到期`)
                : dueTimeHour < 24
                ? setShowIsDue(`还剩 ${dueTimeHour.toFixed(0)} 小时到期`)
                : dueTimeHour < 525600
                ? setShowIsDue(`还剩 ${dueTimeDay.toFixed(0)} 天到期`)
                : setShowIsDue(`还剩 ${dueTiemYear.toFixed(0)} 年到期`)
        }
        useEffect(() => {
            displayTodoDueToTime()
        }) // 显示 todo 的到期时间
        // 显示 Todo 已创建时间
        useEffect(() => {
            displayTodoCreatedTime()
            setInterval(() => {
                displayTodoCreatedTime()
            }, 5000)
        }, [1])
        useEffect(() => {
            setDueToTime(todo.duetotime)
        }, [1]) // 从本地取出到期时间渲染到页面
        useEffect(() => {
            todo.duetotime = duetotime
        }) // 每次用户更改到期时间时，就更新变量中对应的 todo（不需要更改 todoscopy[index]）
        useEffect(() => {
            storageTodos('todoscopy', todoscopy)
        }) // 将用户更改到期时间后的数据存入本地
        return (
            <div className={Style.timer}>
                {' '}
                {/* 过输入的期时间 + 已创建时间 */}
                <div className={Style.userinputtime}>
                    <span className={Style.durationTime}>任务时间:</span>
                    <input // 用户输入的过期时间
                        className={Style.duetotime}
                        value={duetotime}
                        onChange={handleDueToTimeChange}
                        maxLength={6}
                    />
                    <span className={Style.duetotimeunit}>天</span>
                </div>
                <div className={classNameHourglass} title={showIsDue} />{' '}
                {/* 沙漏图片 */}
                <span className={classNameTodoCreatedTime}>
                    {showTodoCreatedTime}
                </span>{' '}
                {/* 创建时间： */}
            </div>
        )
    }),
)

export default TodoView
