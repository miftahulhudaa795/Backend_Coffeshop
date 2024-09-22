const { createPromo, readAllPromo, readOnePromo, updatePromo, deletePromo } = require('../controllers/promo')
const upload = require('../middleware/upload')



const promoRouter = require('express').Router()

promoRouter
        .post (`/`, upload.single ('image'), createPromo)
        .get (`/`, readAllPromo)
        .get(`/:id`, readOnePromo)
        .patch (`/:id`, upload.single ('image'), updatePromo)
        .delete (`/:id`, deletePromo)

module.exports = promoRouter