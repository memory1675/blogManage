export default function random(min, max) {
    let result = parseInt(Math.random() * (max - min + 1)) + min
    return result
}