const express = require('express');
const app = express();
const port = 3000;
const connectDB=require('./config/mongoose');

app.use(express.urlencoded({extended: true}));
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes/index'));




 const start = async() =>{
    try {
        const url = 'mongodb+srv://10442rishika:YJuD5VQRkoeEpTER@cluster2.unkyu3e.mongodb.net/test';
        await connectDB(url);
        app.listen(port,function(){
            // console.log(__dirname+'/uploads');
            console.log("connected to DB")
            console.log(`Server running at port: ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
}
start();
