var express = require('express');

var router = express.Router();


//------------------------------
const video = [
    { id: 1, name: 'footage', introduction: '第1支影片', productvedio: '1' },
    { id: 2, name: 'footage2', introduction: '第2支影片', productvedio: '2' },
    { id: 3, name: 'footage3', introduction: '第3支影片', productvedio: '3' },
];
//------------------------------
// router.get('/', function (req, res, next) {
//     res.send('API is working properly');
// });
//get ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.get('/', (request, response) => {
    response.send('API is working properly');
});

router.get('/api/video', (request, response) => {
    response.send(video);
});
//1 paramter
router.get('/api/video/:id', (request, response) => {
    const course = video.find(c => c.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The coures with the given ID was not found..');
    response.send(course);
});
/*2 paramters
router.get('/api/video/:year/:month', (request, response) => {
    response.send(request.params);
});
router.get('/api/video/:year/:month/:day', (request, response) => {
    response.send(request.query);
});*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//post create*********************************
router.post('/api/video', (request, response) => {
    /* const schema = Joi.object({
        name: Joi.string().min(3).required(),
        // .error(new Error('invalid name')),
    });
    const result = schema.validate(request.body);

    if (result.error) {
        response.status(400).send(result.error.details[0].message);
        return;
    } */
    const { error } = validateCourse(request.body);
    if (error) {
        response.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: video.length + 1,
        name: request.body.name,
    };
    video.push(course);
    response.send(video);
});
// *********************************

//put update=====================================
router.put('/api/video/:id', (request, response) => {
    //Look up the course
    //If not existing, return 404
    const course = video.find(c => c.id === parseInt(request.params.id));
    if (!course) {
        response.status(404).send('The coures with the given ID was not found..');
        return;
    }

    //Validate
    //If invalid,return 400 -bad request
    const { error } = validateCourse(request.body); //return error
    if (error) return response.status(400).send(error.details[0].message);

    //Update course
    course.name = request.body.name;
    //Return the updated course
    response.send(course);
});
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
}

//============================================

//delete ++++++++++++++++++++++++++++++++++++
router.delete('/api/video/:id', (request, response) => {
    //Look up the course
    //If not existing, return 404
    const course = video.find(c => c.id === parseInt(request.params.id));
    if (!course) return response.status(404).send('The coures with the given ID was not found..');

    //Delete
    const index = video.indexOf(course);
    video.splice(index, 1);
    //Return the same course
    response.send(course);
});

//++++++++++++++++++++++++++++++++++++

module.exports = router;
