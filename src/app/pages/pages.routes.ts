import { Routes } from '@angular/router';

export default [
  {
    path: 'view-errors',
    loadComponent: () => import('./view-errors/view-errors').then(m => m.Crud),
    data: { breadcrumb: 'View Errors' }
  },
  {
    path: 'view-monitoring-errors-input',
    loadComponent: () => import('./view-monitoring-errors_input/view-monitoring-errors').then(m => m.ViewMonitoringErrorsInput),
    data: { breadcrumb: 'Monitor Input' }
  },
  {
    path: 'view-monitoring-errors-output',
    loadComponent: () => import('./view-monitoring-errors-output/view-monitoring-errors').then(m => m.ViewMonitoringErrorsOutput),
    data: { breadcrumb: 'Monitor Output' }
  }
] as Routes;
