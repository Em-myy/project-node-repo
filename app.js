const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb+srv://emmanuel:KGtTH35RYKsDV2Sg@nodecluster.napstdi.mongodb.net/?retryWrites=true&w=majority&appName=nodecluster'
mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/single-blog', (req, res) => {
    Blog.findById('67f3ff779da25372902814ec')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
})
*/

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title : 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title : '404' });
});
