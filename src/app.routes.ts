import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';
import { Crud } from '@/pages/crud/crud';
import { ViewMonitoringErrorsInput } from '@/pages/view-monitoring-errors_input/view-monitoring-errors';
import { ViewMonitoringErrorsOutput } from '@/pages/view-monitoring-erros-output/view-monitoring-errors';

export const appRoutes: Routes = [
   {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'view-errors', pathMatch: 'full' },
            { path: 'view-errors', component: Crud, data: { breadcrumb: 'View Errors' } },
            { path: 'view-monitoring-errors-input', component: ViewMonitoringErrorsInput, data: { breadcrumb: 'Monitor Input' } },
            { path: 'view-monitoring-errors-output', component: ViewMonitoringErrorsOutput, data: { breadcrumb: 'Monitor Output' } }
        ]
    }
];
