import { Router } from 'express'
import { SampleController } from '../controllers/sample-controller'
import { TamanhoController } from '../controllers/TamanhoController';

const router = Router();

router.get('/sample', SampleController)

// Tamanho
router.get('/tamanhos', new TamanhoController().getTamanhos)

export default router