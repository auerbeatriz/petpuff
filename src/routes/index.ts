import Router from 'express'
import { SampleController } from '../controllers/sample-controller'

const router = Router();

router.get('/api', SampleController);

export default router