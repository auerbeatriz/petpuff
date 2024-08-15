import express from 'express'

const router = express.Router();

router.get('/api', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Seja bem-vinde a PetPuff',
        version: '1.0.0'
    });
});

export default router