const cors = require('cors')
const express = require('express')

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'airbnb-clone-server' })
})

app.listen(port, () => {
  console.log(`API listening on http://127.0.0.1:${port}`)
})
