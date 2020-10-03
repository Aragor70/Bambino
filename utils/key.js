

const key = (length) => {

    const numbers = []
    for (let i = 0; i < length; i++) {
        const number = randomNumber(10)
        numbers.push(number)
    }

    return numbers;
}
const randomNumber = (limit) => {
    return Math.floor(Math.random() * limit)
}
module.exports = key;