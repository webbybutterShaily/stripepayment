const cors = require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_51JYSXDSGlGZIYUSmFy7RKwQOmGoF5SOCUxugdmO4tw49IjEEZXbxzPUKoBeb9Pu3a2aaZxIGNAxGZJEtBvzUKZdJ00sc5ekrB2")
const {v4: uuid} = require("uuid")
const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.send("It works")
});

app.post("/payment", (req,res) => {
    const {product, token} = req.body;
    console.log("Product: ", product);
    console.log("Price: ", product.price);
    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            // shipping:{
            //     name:token.card.name,
            //     address:{
            //         country: token.card.address_country
            //     }
            // }
        },{idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})



app.listen(8282, () => console.log("LISTENING AT PORT 8282"))
