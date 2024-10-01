const { createPromo, readAllPromo, readOnePromo, updatePromo, deletePromo } = require('../controllers/promo')
const upload = require('../middleware/upload')
const { verifyAdmin } = require('../middleware/verifyToken')



const promoRouter = require('express').Router()

promoRouter
        .post (`/`, verifyAdmin, upload.single ('image'), createPromo)
        .get (`/`, readAllPromo)
        .get(`/:id`, readOnePromo)
        .patch (`/:id`, verifyAdmin, upload.single ('image'), updatePromo)
        .delete (`/:id`, verifyAdmin, deletePromo)

module.exports = promoRouter