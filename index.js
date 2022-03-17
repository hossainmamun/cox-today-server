const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send(`today is : ${new Date().toDateString('dd/mm/yyy')}`);
})

// ! mongo client connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USER_PASSWORD}@cluster0.1ssjj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const bookingCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_BOOKING);
    const roomCollection = client.db(process.env.DB_NAME).collection(process.env.DB_ROOMS_COLLECTION);
    const reviewCollection = client.db(process.env.DB_NAME).collection(process.env.DB_REVIEWS_COLLECTION);
    const specialOfferCollection = client.db(process.env.DB_NAME).collection(process.env.DB_SPECIAL_OFFER);
    const blogCollection = client.db(process.env.DB_NAME).collection(process.env.DB_BLOG_COLLECTION);
    const galleryImgCollection = client.db(process.env.DB_NAME).collection(process.env.DB_GALLERY_IMG_COLLECTION);

    // !todo ***************** POST METHOD **************
    // ! post client booking info
    app.post('/booking-collection', (req, res) => {
        const bookingInfo = req.body;
        bookingCollection.insertOne(bookingInfo)
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! post hotel rooms
    app.post('/hotel-room-collection', (req, res) => {
        const roomInfo = req.body;
        roomCollection.insertOne(roomInfo)
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! post clients review
    app.post('/clients-review', (req, res) => {
        const reviews = req.body;
        reviewCollection.insertOne(reviews)
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! post special offer rooms
    app.post('/special-offer-room', (req, res) => {
        const specialOffer = req.body;
        specialOfferCollection.insertOne(specialOffer)
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err);
                }
            })
    })
    // ! post latest blogs
    app.post('/latest-blogs', (req, res) => {
        const latestBlog = req.body;
        blogCollection.insertOne(latestBlog)
            .then((err, result) => {
                if (!err) {
                    res.send(result);
                }
                else {
                    res.send(err);
                }
            })
    })
    // ! post gallery images
    app.post('/upload-img-gallery', (req, res) => {
        const galleryImg = req.body;
        galleryImgCollection.insertOne(galleryImg)
            .then((err, result) => {
                if (!err) {
                    res.send(result);
                }
                else {
                    res.send(err);
                }
            })
    })


    // !todo ************* GET METHOD ***********
    // ! get hotel rooms
    app.get('/hotel-room-list', (req, res) => {
        roomCollection.find({})
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents);
                }
                else {
                    res.send(err);
                }
            })
    })
    // ! get single hotel room
    app.get('/hotel-room-list/:id', (req, res) => {
        const getRoomDetail = req.params.id;
        roomCollection.find({ _id: ObjectId(getRoomDetail) })
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents[0])
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! get client review
    app.get('/client-reviews', (req, res) => {
        reviewCollection.find({})
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! edit clients review
    app.get('/client-reviews/:id', (req, res) => {
        const clientReview = req.params.id;
        reviewCollection.find({ _id: ObjectId(clientReview) })
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents[0])
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! get special rooms offer
    app.get('/special-offer', (req, res) => {
        specialOfferCollection.find({})
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! get latest blogs
    app.get('/latest-blogs', (req, res) => {
        blogCollection.find({})
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! get gallery images
    app.get('/gallery', (req, res) => {
        galleryImgCollection.find({})
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! edit clients bookings
    app.get('/edit-booking-list/:id', (req, res) => {
        const editInfo = req.params.id;
        bookingCollection.find({ _id: ObjectId(editInfo) })
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents[0])
                }
                else {
                    res.send(err)
                }
            })
    })



    // !todo *************** UPDATE METHOD ************
    // ! update clients booking info
    app.put('/edit-booking-list/:id', (req, res) => {
        const id = req.params.id;
        const updateBooking = req.body;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                firstName: updateBooking.firstName,
                lastName: updateBooking.lastName,
                email: updateBooking.email,
                phone: updateBooking.phone,
                category: updateBooking.category,
                type: updateBooking.type,
                arrival: updateBooking.arrival,
                departure: updateBooking.departure,
                adult: updateBooking.adult,
                children: updateBooking.children,
                bookingType: updateBooking.bookingType,
            }
        }
        const result = bookingCollection.updateOne(filter, updateDoc, options)
            // res.json(result);
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! update review information
    app.put('/client-reviews/:id', (req, res) => {
        const id = req.params.id;
        const updateReview = req.body;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                name: updateReview.name,
                profession: updateReview.profession,
                comments: updateReview.comments,
            }
        }
        const result = reviewCollection.updateOne(filter, updateDoc, options)
            // res.json(result);
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })

    // !todo **************** DELETE METHOD ***************
    // ! delete clients booking info
    app.delete('/delete-booking-info/:id', (req, res) => {
        const deleteBooking = req.params.id;
        bookingCollection.deleteOne({ _id: ObjectId(deleteBooking) })
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })
    // ! delete clients review
    app.delete('/client-reviews/:id', (req, res) => {
        const deleteReview = req.params.id;
        reviewCollection.deleteOne({ _id: ObjectId(deleteReview) })
            .then((err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
    })


    // !todo ***************** DASHBOARD SECTION GET METHOD ***************
    // ! get clients booking info
    app.get('/booking-list', (req, res) => {
        bookingCollection.find({})
            .toArray((err, documents) => {
                if (!err) {
                    res.send(documents)
                }
                else {
                    res.send(err)
                }
            })
    })

    // !* database connection
    console.log('db connected')
});

// !* post listening
const port = process.env.PORT || 1111;
app.listen(port, () => {
    console.log(`port listening ${port}`);
});
