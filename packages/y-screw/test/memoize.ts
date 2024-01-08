import memoize from '../memoize'

let i = 0

function add() {
    i += 1

    return i
}

const addMemo1 = memoize(add)

console.log(addMemo1()) // 1
console.log(addMemo1()) // 1
console.log(addMemo1()) // 1

const addMemo2 = memoize(add, { maxAge: 0 })
console.log(addMemo2()) // 2
console.log(addMemo2()) // 3
console.log(addMemo2()) // 4

const addMemo3 = memoize(add, { maxAge: 1 })
console.log(addMemo3()) // 5
console.log(addMemo3()) // 5
setTimeout(() => {
    // 1秒后缓存到期, 所以此时这里得到的数字为 6
    console.log(addMemo3()) // 6
}, 1000)
