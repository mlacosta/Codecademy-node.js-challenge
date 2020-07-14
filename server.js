const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req,res)=>{
    const randomQuote = getRandomElement(quotes);
    delete randomQuote.person;

    console.log(randomQuote)
    res.send({quote: randomQuote});
})

app.get('/api/quotes',(req,res)=>{
    
    let author = req.query.person;
    
    console.log(author)

    if(author === undefined){
        console.log('Empty request');
        res.send({quotes: quotes});
    }else{
        
        const filterQuotes = quotes.filter(quote => quote.person === author);
        res.send({quotes: filterQuotes});
    }
})


app.post('/api/quotes', (req,res)=>{

    const data = req.query;
    console.log(data);

    if ((data.quote) && (data.person)){
        quotes.push(data);
        res.status(201).send({quote:data});

    }else{
        res.status(400).send();
    }


}
)

app.listen(PORT,()=>{
    console.log(`listening to Port ${PORT}`);
})

