const path = require('path');
const exphbs = require('express-handlebars');

var express = require('express');
var app = express();
const cors = require('cors');
require('./app/middlewares/passportGGStratery')
// const handlebars = require('express-handlebars');

const productRouter = require('./app/routers/product.router')
const authRouter = require('./app/routers/auth.router');
const billRouter = require('./app/routers/bill.router');

app.use(express.static('public'));

app.engine('.hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'app/views'));

// console.log(path.join(__dirname, 'app/views'))
// console.log(__dirname)

app.get('/', (req, res) => {
    res.render('forgotPasswordView')
})

app.use(cors());

app.listen(3001, function () {
    console.log('Node server running @ http://localhost:3001')
});
app.use(express.json())


app.use('/product', productRouter)

app.use('/auth', authRouter)

app.use('/bill', billRouter)

