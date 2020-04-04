const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '2531e242631f431aa29f251118365f49'
});

const handleapi = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}
const handleimage = (req,res,db) => {
    const { id } = req.body;
    db('users').where('id', '=' ,id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleimage,
    handleapi
}