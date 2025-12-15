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
            { path: '', redirectTo: 'view_errors', pathMatch: 'full' },
            { path: 'view_errors', component: Crud, data: { breadcrumb: 'Visor Errores' } },
            { path: 'view_monitoring_errors_input', component: ViewMonitoringErrorsInput, data: { breadcrumb: 'Monitorear Entrada' } },
            { path: 'view_monitoring_errors_output', component: ViewMonitoringErrorsOutput, data: { breadcrumb: 'Monitorear Salida' } }
        ]
    }
];
