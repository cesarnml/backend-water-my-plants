require('dotenv').config()

const server = require('./server.js')
const port = process.env.PORT || 4000

//* "Sanity Check"
server.get('/', (req, res) => {
  res.status(200).send(' 👨‍🔬 All systems nominal. 🤦‍')
})

server.listen(port, () => {
  console.log(`------Listening on port ${port}!--------`)
})
