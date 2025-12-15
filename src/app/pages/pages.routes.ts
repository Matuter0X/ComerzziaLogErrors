import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { ViewMonitoringErrorsInput } from './view-monitoring-errors_input/view-monitoring-errors';
import { ViewMonitoringErrorsOutput } from './view-monitoring-erros-output/view-monitoring-errors';

export default [
    { path: 'crud', component: Crud, data: { breadcrumb: "Vista Errores"}},
    { path: 'view_monitoring_errors_input', component: ViewMonitoringErrorsInput, data: { breadcrumb: 'Monitorear Entrada' }},
    { path: 'view_monitoring_errors_output', component: ViewMonitoringErrorsOutput, data: { breadcrumb: 'Monitorear Salida' }}
] as Routes;
