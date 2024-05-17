const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())

const orders = []

const checkOrderId = ( request, response, next ) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    if(index < 0) {
        return response.status(404).json({ message: "order not foud"})
    }
    request.orderIndex = index
    request.orderId = id    
    next()
}

const checkUrl = ( request, response, next ) => {
    console.log(request.method)
    console.log(request.url)
    next()
}

app.get('/order', checkUrl, ( request, response ) =>{
    return response.json(orders)
})

app.post('/order', checkUrl, ( request, response ) =>{
    const { order, clientName, price, status } = request.body
    const list = { id: uuid.v4(), order, clientName, price, status } 
    orders.push(list)
    return response.status(201).json(list)
})

app.put('/order/:id', checkOrderId, checkUrl, ( request, response ) =>{
    const index = request.orderIndex
    const id = request.orderId
    const { order, clientName, price, status } = request.body
    const updateList = { id, order, clientName, price, status }
    orders[index] = updateList
    return response.json(updateList)
})

app.delete('/order/:id', checkOrderId, checkUrl, ( request, response ) =>{
    const index = request.orderIndex
    orders.splice(index,1)
    return response.status(204).json()
})

app.get("/order/:id", checkOrderId, checkUrl, (request, response) => {
    const { order, clientName, price, status } = request.body
    const index = request.orderIndex
    const id = request.orderId
    return response.json(orders[index])
})

app.patch('/order/:id', checkOrderId, checkUrl, ( request, response ) =>{
    const index = request.orderIndex
    const id = request.orderId
    const { order, clientName, price, status } = request.body
    const updateList = { id, order, clientName, price, status }
    orders[index] = updateList
    return response.json(updateList)
})

app.listen(port, () =>{
    console.log(`🚀Server started on port${port}🚀`)
})

