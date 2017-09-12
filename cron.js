const cron = require('node-cron')
let due = new Date('2017-09-05T14:31:00.000Z')
let now = new Date()

let z = due.getTime() - now.getTime()
z = Math.floor(z / 1000) * 1000

console.log('now', new Date());
console.log(new Date(z).getSeconds(), new Date(z).getMinutes(), new Date(z).getMonth())
cron.schedule(`30 * * * * *`, function() {
  console.log(new Date().getSeconds());
})
// console.log(x)
