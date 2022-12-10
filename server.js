const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

// our middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/notes', apiRoutes);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
// start server
app.listen(PORT, ()=> console.log(`listening on port http://localhost:${PORT}`));
