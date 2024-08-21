import { Router } from 'express'
import { SampleController } from '../controllers/sample-controller'
import { TamanhoController } from '../controllers/TamanhoController';
import { KitMaterialController } from '../controllers/KitMaterialController';
import { OrcamentoController } from '../controllers/OrcamentoController';

const router = Router();

const orcamentoController = new OrcamentoController()

router.get('/sample', SampleController)

// Cliente
router.get('/cliente/:id/orcamentos', (req, res) => orcamentoController.getOrcamentosCliente(req, res) )

// Personalizar pelucia
router.get('/tamanhos', new TamanhoController().getTamanhos)
router.get('/kits-materiais', new KitMaterialController().getKitsMateriais)
router.post('/cliente/:id/orcamento', (req, res) => orcamentoController.create(req, res))

// Orcamento
router.get('/orcamento/:id', (req, res) => orcamentoController.getOrcamento(req, res))
router.delete('/orcamento/:id', (req, res) => orcamentoController.deleteOrcamento(req, res) )


export default router