import { Router } from 'express';
import businessController from '../controllers/business.controller';

const router = Router();

router.get('/', businessController.list); 

router.get('/count', businessController.count);

//router.get('/search', businessController.search);

router.get('/page', businessController.listPagination);

router.get('/walletSearch/:wallet', businessController.walletSearch);

router.get('/:id', businessController.show);

router.post('/addBusiness', businessController.create);

router.post('/editBusiness/:id', businessController.edit);

router.delete('/deleteBusiness/:id', businessController.remove);


export default router;