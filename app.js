const { Room1, Room2  } = require("./Schema")
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
require('dotenv').configue()

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotelmanagement')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('hey there !...')
})

//--------------------------for Room1 ----------------------------------------------//
app.post('/api/v1/rooms-type', async (req, res) => {
    const hotel = new Room1(req.body)
    await hotel.save()
    const hotelID = await hotel._id

})
app.get('/api/v1/rooms-type', async (req, res) => {
   const hotels = await Room1.find()
   return res.send(JSON.stringify(hotels))
})


//--------------------------for Room2 ----------------------------------------------//

app.post('/api/v1/rooms', async (req, res) => {
    const hotel = new Room2(req.body)
    await hotel.save()
    const hotelID = await hotel._id

})

app.get(`/api/v1/rooms?search=searchRoomNameMatch&roomType=searchRoomTypeNameMatch
&minPrice=searchRoomMinimumPriceMatch&maxPrice=searchRoomMaximumPriceMatch`, async (req, res) => {
  const { search, roomType, minPrice, maxPrice } = req.query
  if(maxPrice && !minPrice){
     minPrice = 0
     const particularHotels = await Room2.find().filter( hotel => {
        return hotel.maxPrice == maxPrice && hotel.minPrice == 0 && hotel.roomType == roomType
     })
     return res.send(JSON.stringify(particularHotels))
  }
  if(maxPrice && minPrice){

    const particularHotels = await Room2.find().filter( hotel => {
       return hotel.maxPrice == maxPrice && hotel.minPrice == minPrice && hotel.roomType == roomType
    })
    return res.send(JSON.stringify(particularHotels))
 }
  
})

app.patch('/api/v1/rooms/:roomId', async( req, res) => {
    const  roomId   = req.params.roomId
    
    try {
        const editRoom2 = await Room2.findByIdAndUpdate(roomId, {...req.body} )
       if(editRoom2){
             return  res.send(JSON.stringify(editRoom2))
       }else {
           return res.send('Error could not edit room2')
        }
    } catch (error) {
       res.send(error.message) 
    }

})

app.delete('/api/v1/rooms/:roomId', async(req, res) => {
    const  roomId   = req.params.roomId
    try {
        const deleteRoom2  = await Room2.findByIdAndDelete(roomId)
        res.send('Room has been deleted')
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/api/v1/rooms/roomId', async( req, res) => {
   try {
        const getParticularRoom = await Room2.findById(req.params.roomId)
        return res.send(JSON.stringify(getParticularRoom))
   } catch (error) {
        res.send(error.message)
   }
})
 

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running on port 3000 .....');
})
