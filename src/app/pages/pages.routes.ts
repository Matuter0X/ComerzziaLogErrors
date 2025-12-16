import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { ViewMonitoringErrorsInput } from './view-monitoring-errors_input/view-monitoring-errors';
import { ViewMonitoringErrorsOutput } from './view-monitoring-erros-output/view-monitoring-errors';

export default [
    { path: 'crud', component: Crud, data: { breadcrumb: "Vista Errores"}},
    { path: 'view-monitoring-errors-input', component: ViewMonitoringErrorsInput, data: { breadcrumb: 'Monitorear Entrada' }},
    { path: 'view-monitoring-errors-output', component: ViewMonitoringErrorsOutput, data: { breadcrumb: 'Monitorear Salida' }}
] as Routes;
