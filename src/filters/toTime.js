export default (time) => {
    let date = new Date(parseInt(time))
    let Y = date.getFullYear() 
    let M = (date.getMonth() + 1+'').padStart(2,'0')
    let D =(date.getDate()+'').padStart(2,'0')
    return `${Y}-${M}-${D}`
}