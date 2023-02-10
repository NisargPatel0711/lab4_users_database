const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/Users");
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose
    .connect(
        "mongodb+srv://nisarg0711:nishu@cluster0.c6toxmm.mongodb.net/comp3133-lab04?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((success) => {
        console.log("Success Mongodb connection");
    })
    .catch((err) => {
        console.log("Error Mongodb connection");
    });

app.post("/users", async (req, res) => {
    const user = new userModel(req.body);
    try {
        await user.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send(user);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
