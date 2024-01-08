import addBigNumbers from '../add-big-numbers'

const value = addBigNumbers(
    '11111111111.11111111111111111111111111111111111111111111111',
)
    .add('22222222222.33333333333333333333333333333333333333333333333')
    .get()

console.log(
    value === '33333333333.44444444444444444444444444444444444444444444444',
)

console.log(addBigNumbers('123').get() === '123')
