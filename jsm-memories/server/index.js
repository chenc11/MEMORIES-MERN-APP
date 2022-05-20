import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

/*
body-parser is an NPM package that parses incoming request bodies in a middleware before your handlers, 
available under the req.body property.

app.use(bp.json()) looks at requests where the Content-Type: 
application/json header is present and transforms the text-based JSON input 
into JS-accessible variables under req.body. 

app.use(bp.urlencoded({extended: true}) does the same for URL-encoded requests. 
the extended: true precises that the req.body object will contain values of any 
type instead of just strings.
*/

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//add pre-fixed /posts to all routes in postRoutes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
