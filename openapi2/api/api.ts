export * from './adminAPI.service';
import { AdminAPIService } from './adminAPI.service';
export * from './monitorController.service';
import { MonitorControllerService } from './monitorController.service';
export const APIS = [AdminAPIService, MonitorControllerService];
