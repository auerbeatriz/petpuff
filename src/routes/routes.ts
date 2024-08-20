import { Router } from 'express'
import { SampleController } from '../controllers/sample-controller'
import { TamanhoController } from '../controllers/TamanhoController';
import { KitMaterialController } from '../controllers/KitMaterialController';
import { OrcamentoController } from '../controllers/OrcamentoController';

const router = Router();

const orcamentoController = new OrcamentoController()

router.get('/sample', SampleController)

// Cliente
router.get('/cliente/:clienteId/orcamentos', (req, res) => orcamentoController.getOrcamentosCliente(req, res) )

// Personalizar pelucia
router.get('/tamanhos', new TamanhoController().getTamanhos)
router.get('/kits-materiais', new KitMaterialController().getKitsMateriais)
router.post('/cliente/:clienteId/orcamento', (req, res) => orcamentoController.create(req, res))

export default router