import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { ViewMonitoringErrorsInput } from './view-monitoring-errors_input/view-monitoring-errors';
import { ViewMonitoringErrorsOutput } from './view-monitoring-erros-output/view-monitoring-errors';

export default [
    { path: 'crud', component: Crud, data: { breadcrumb: "View Errors" } },
    { path: 'view-monitoring-errors-input', component: ViewMonitoringErrorsInput, data: { breadcrumb: 'Monitor Input' }},
    { path: 'view-monitoring-errors-output', component: ViewMonitoringErrorsOutput, data: { breadcrumb: 'Monitor Output' }}
] as Routes;
