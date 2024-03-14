
const express = require('express')
const app = express()
const port = 1312

app.get('/', (req, res) => {
  res.send('Hello TuSuerte!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

