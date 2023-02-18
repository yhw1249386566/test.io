/* eslint-disable */
// @ts-nocheck
import { observer, inject } from "mobx-react"
import { action } from "mobx"
import React from 'react';
import Style from "./todofooter.less";
import { useRef } from "react";

const TodoFooter =
    inject('store')(observer(
        (props: any) => {
            const { store } = props;
            // 获取所有/未完成/已完成任务 按钮的节点
            const [allButtonRef, unfinishedButtonRef, finishedButtonRef] = [useRef(), useRef(), useRef()]
            const [allButton, unfinishedButton, finishedButton]
                = [allButtonRef.current, unfinishedButtonRef.current, finishedButtonRef.current]
            const setClassIDStatusstrategy = new Map([ // 设置按钮 class,id 为 active（激活）的策略
                // 根据 status 修改 All 按钮的是否处于激活状态
                ['allButton', (status?: string) =>
                    status === 'active' // 条件表单式始终为 true 是用来在后面使得三木运算符的一条表达式可以通过 '&&' 执行多条方法
                        ? (allButton?.setAttribute('class', `${Style.all} ${Style.active}`) ?? true) && (allButton?.setAttribute('id', 'active') ?? true)
                        : (allButton?.setAttribute('class', `${Style.all}`) ?? true) && (allButton?.setAttribute('id', '') ?? true)

                ],
                ['unfinishedButton', (status?) =>
                    status === 'active'
                        ? (unfinishedButton?.setAttribute('class', `${Style.unfinished} ${Style.active}`) ?? true) && (unfinishedButton?.setAttribute('id', 'active') ?? true)
                        : (unfinishedButton?.setAttribute('class', `${Style.unfinished}`) ?? true) && (unfinishedButton?.setAttribute('id', '') ?? true)
                ],
                ['finishedButton', (status?) =>
                    status === 'active'
                        ? (finishedButton?.setAttribute('class', `${Style.finished} ${Style.active}`) ?? true) && (finishedButton?.setAttribute('id', 'active') ?? true)
                        : (finishedButton?.setAttribute('class', `${Style.finished}`) ?? true) && (finishedButton?.setAttribute('id', '') ?? true)
                ],
            ])
            // 返回一个函数，通过该函数
            const setElClassIDStatus = (btnName: string, status?: string) => setClassIDStatusstrategy?.get(btnName)?.(status)
            const elmentHightLightStrategy: Map<string, () => void> = new Map([ // 每个按钮封装 1 个使它高亮的方法
                ['allButton', () => { // 使 allButton 高亮
                    setElClassIDStatus('allButton', 'active')
                    setElClassIDStatus('unfinishedButton')
                    setElClassIDStatus('finishedButton')
                }],
                ['unfinishedButton', () => { // 使 unfinishedButton 高亮
                    setElClassIDStatus('allButton')
                    setElClassIDStatus('unfinishedButton', 'active')
                    setElClassIDStatus('finishedButton')
                }],
                ['finishedButton', () => { // 使 finishedButton 高亮
                    setElClassIDStatus('allButton')
                    setElClassIDStatus('unfinishedButton')
                    setElClassIDStatus('finishedButton', 'active')
                }],
            ])
            const setElementsHighlight = (btnName: string) => elmentHightLightStrategy?.get?.(btnName)?.()// 传入按钮名字，设置当前按钮高亮 
            const handleClickAll = () => {  // 显示所有任务，并使得 All 按钮高亮
                setElementsHighlight('allButton')
                store.todos = store.todoscopy

            }
            const handleClickUncomplete = () => { // 显示未完成任务，并使得 Uncomplete 按钮高亮
                setElementsHighlight('unfinishedButton')
                store.todos = [...store.getCurrentUncompleteTask] // 未完成任务替换 todos，触发强制更新
            }
            const handleClickCompleted = () => {  // 显示已完成任务，并使得 Completed 按钮高亮
                setElementsHighlight('finishedButton')
                store.todos = [...store.getCurrentCompletedTask] // 已完成任务替换 todos，触发强制更新
            }
            // // 使得每次重载网页，都点击 All 按钮获取一次数据，
            // useEffect(() => { setTimeout(() => { document.getElementById('active')?.click() }, 0); }, [1])
            return (
                // 未完成任务数量 + All 按钮 + Uncomplete 按钮 + Completed 按钮
                <footer className={Style.todofooter}>
                    {/* 未完成任务数量 */}
                    <div className={Style.taskleft}><span>{store.left}</span> task left</div>
                    {/* All 按钮 */}
                    <div ref={allButtonRef} className={`${Style.all} ${Style.active}`} id={'active'}
                        onClick={action(handleClickAll)}>All</div>
                    {/* Uncomplete 按钮 */}
                    <div ref={unfinishedButtonRef} className={`${Style.unfinished}`} id={''}
                        onClick={action(handleClickUncomplete)}>Uncomplete</div>
                    {/* Completed 按钮 */}
                    <div ref={finishedButtonRef} className={`${Style.finished}`} id={''}
                        onClick={action(handleClickCompleted)}>Completed</div>
                </footer>
            )
        }
    ))

export default TodoFooter