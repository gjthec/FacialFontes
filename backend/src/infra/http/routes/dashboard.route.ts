import { Application, Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { verifyAccess } from '../middlewares/auth.middleware';
import getUserTenant from '../middlewares/tenant.middleware';
import validateHeaders from '../validators/index.validator';

export default function defineRoute(app: Application) { 
  const router: Router = Router(); 

  const dashboardController: DashboardController = new DashboardController(); 

  app.use('/api/dashboard', router);
};  
