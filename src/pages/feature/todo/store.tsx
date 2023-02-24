/* eslint-disable */
// @ts-nocheck
import { makeAutoObservable } from 'mobx'

// 建造每条数据基本信息。
class Todo {
    id: number
    userInputValue: string
    finished: boolean
    duetotime: string
    toggle: () => void
    constructor(userInputValue: string) {
        this.id = Date.now()
        this.userInputValue = userInputValue
        this.finished = false
        this.duetotime = '1'
        this.toggle = () => (this.finished = !this.finished)
        makeAutoObservable(this)
    }
}
// 数据存储和处理
class Store {
    todos: any = [] // 存放所有 list
    todoscopy: any = [] // todos 的副本
    createTodo: (arrName: string, userInputItem: string) => void
    removeTodo: (deleteTodosName: string, todo: Todo) => void
    clearFinished: () => void
    storageTodos: (storageTodos: string, todos: string) => void
    parsingJSON: (todosString: string) => object
    get left() {
        return this.getCurrentUncompleteTask.length
    } // 得到当前未完成任务长度
    get getCurrentCompletedTask() {
        return this.todoscopy.filter((todocopy) => todocopy.finished === true)
    } // 得到 todoscopy 当前已完成任务
    get getCurrentUncompleteTask() {
        return this.todoscopy.filter((todocopy) => todocopy.finished === false)
    } // 得到 todoscopy当前未完成任务
    // get getCurrentTodoUncompleteTask() { return this.todos.filter((todo) => todo.finished === false) } // 得到 todos 当前未完成
    // get getCurrentTodoCompletedTask() { return this.todos.filter((todo) => todo.finished === true) } // 得到 todos 当前已完成
    set changeAllTodoListCompleted([todos, todoscopy]) {
        // this[todos].forEach((todo) => todo.finished = true)
        this[todoscopy].forEach((todo) => (todo.finished = true))
        document.getElementById('active')?.click() // 获取 id=active 的元素，当用户在未完成任务界面点击完成所有按钮时，模拟 Uncompleted 按钮单击一次。
    } // 改变 todos/copy 所有待办项为已完成
    set changeAllTodoListUncompleted([todos, todoscopy]) {
        // this[todos].forEach((todo) => todo.finished = false)
        this[todoscopy].forEach((todo) => (todo.finished = false))
    } // 改变 todos/copy 所有待办项为未完成
    constructor() {
        this.createTodo = (arrName, userInputItem) => {
            userInputItem !== ''
                ? this[arrName].unshift(new Todo(userInputItem))
                : null // 防止添加空待办
        }
        this.removeTodo = (deleteTodosName, todo) =>
            this[deleteTodosName].remove(todo) // observable 的内置方法，参见：https://cn.mobx.js.org/refguide/array.html
        // 使用 this.todos.filter((todo) => todo.finished ? this.removeTodo(todo) : null)，不知道为什么，每次只能移除一半已完成的任务
        this.clearFinished = () => {
            this.todoscopy = this.getCurrentUncompleteTask
            document.getElementById('active')?.click()
            // this.todos = this.getCurrentTodoUncompleteTask
        } // 用所有未完成任务数组替换原有数组，从而达到清空已完成任务的效果
        this.storageTodos = (localname, todos) =>
            localStorage.setItem(localname, JSON.stringify(todos))
        this.parsingJSON = (todosString) => JSON.parse(todosString ?? '[]')
        makeAutoObservable(this)
    }
}
const store = new Store()

export default store
