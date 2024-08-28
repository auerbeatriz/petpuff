import { Router } from 'express'
import { SampleController } from '../controllers/sample-controller'
import { TamanhoController } from '../controllers/TamanhoController';
import { KitMaterialController } from '../controllers/KitMaterialController';
import { OrcamentoController } from '../controllers/OrcamentoController';
import { ClienteController } from '../controllers/ClienteController';
import { PedidoController } from '../controllers/PedidoController';

const router = Router();

const orcamentoController = new OrcamentoController()

router.get('/sample', SampleController)

// Cliente
router.get('/cliente/:id/orcamentos', (req, res) => orcamentoController.getOrcamentosCliente(req, res))
router.get('/cliente', (req, res) => new ClienteController().getCliente(req, res))

// Personalizar pelucia
router.get('/tamanhos', new TamanhoController().getTamanhos)
router.get('/kits-materiais', new KitMaterialController().getKitsMateriais)
router.post('/orcamento', (req, res) => orcamentoController.create(req, res))

// Orcamento
router.get('/orcamento/:id', (req, res) => orcamentoController.getOrcamento(req, res))
router.delete('/orcamento/:id', (req, res) => orcamentoController.deleteOrcamento(req, res))
router.put('/orcamento/:id', (req, res) => orcamentoController.responderOrcamento(req, res))
router.put('/pelucia/:id', (req, res) => orcamentoController.atualizarPelucia(req, res))
router.post('/orcamento/:id/reabrir', (req, res) => orcamentoController.reabrirOrcamento(req, res))

// Pedidos
router.get('/frete', (req, res) => new PedidoController().getMetodosEntrega(req, res))
router.post('/pedido', (req, res) => new PedidoController().fecharPedido(req, res))


export default router