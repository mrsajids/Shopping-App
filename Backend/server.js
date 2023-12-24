const express = require('express')
const cors = require('cors')
const products = require('./data/products')
const dotenv=require('dotenv')
const dbconnection = require('./config/config')
const productRoute =require('./router/productRoute')
const userRoute =require('./router/userRoute')
const errorHandler = require('./middleWare/errorMiddleWare')
const app = express()

//cors error
app.use(cors())

// configuration 
dotenv.config()

//mongoose connection
dbconnection()

//middleware for json
app.use(express.json())

//middleware for error
// app.use(errorHandler)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('/api',productRoute)
app.use('/api/user/',userRoute)

// app.get("/", (req, res) => {
//     res.send('<h1>Welcome to the server..</h1>')
// })

// app.get("/products", (req, res) => {
//     res.json(products)
// })

// app.get("/products/:id", (req, res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// })

const PORT=4000
app.listen(process.env.PORT||PORT, () => {
    console.log(`Server running in ${process.env.NODE_MODE} mode at ${process.env.PORT}`);
})
