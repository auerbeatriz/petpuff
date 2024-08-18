import { Router } from 'express'
import { SampleController } from '../controllers/sample-controller'
import { TamanhoController } from '../controllers/TamanhoController';
import { KitMaterialController } from '../controllers/KitMaterialController';
import { OrcamentoController } from '../controllers/OrcamentoController';

const router = Router();

router.get('/sample', SampleController)

// Cliente

// Personalizar pelucia
router.get('/tamanhos', new TamanhoController().getTamanhos)
router.get('/kits-materiais', new KitMaterialController().getKitsMateriais)
router.post('/cliente/:clienteId/orcamento', (req, res) => new OrcamentoController().create(req, res))

export default router