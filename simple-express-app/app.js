const bodyParser=require('body-parser');
const express=require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * {
 *   "name": "Israel israeli"
 * }
 */

app.post('/hello', (req, res) => {
    res.send("Hello " +  req.body.name)
});

app.listen(3000, () =>
  console.log("Example app listening on port 3000"),
);