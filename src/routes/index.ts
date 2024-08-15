import Router from 'express'
import { SampleController } from '../controllers/sample-controller'

const router = Router();

router.get('/sample', SampleController);

export default router