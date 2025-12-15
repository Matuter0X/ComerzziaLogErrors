import { Component, inject, OnInit, ViewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IntegrationErrorsService } from '@openapi/api/integrationErrors.service';
import { EntityIntegrationLogBean } from '@openapi/model/entityIntegrationLogBean';
import { forkJoin } from 'rxjs';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        SplitButtonModule
    ],
    templateUrl: `./crud.html`,
    styleUrl: './crud.scss',
    providers: [MessageService, ConfirmationService]
})
export class Crud implements OnInit {

    //Inyectamos el servicio de OpenApi
    private integrationErrorsService = inject(IntegrationErrorsService);

    // Datos que vendrán de la API
    logs: EntityIntegrationLogBean[] = [];

    // Estados para la UI
    loading: boolean = false;
    errorMessage: string | null = null;

    //Variable booleana que se usa para conocer si la api devuelve o no datos
    foundLogErrors = false;

    //Variable booleana que se usa para conocer cuando pueden ser exportados los registros logs
    canExportCSV = false;

    //estado del diálogo de traza
    traceDialogVisible: boolean = false;
    currentTraceMessage: string = '';

    //Logs seleccionados en el checkboxs
    selectedLogs: any[] = [];

    //ExportarCSV
    @ViewChild('dt') dt!: Table;

    cols: Column[] = [];   // columnas visibles/exportables
    
    ngOnInit() {
        this.cols = [
            { field: 'errorUid',        header: 'ID Error' },
            { field: 'classId',         header: 'Clase' },
            { field: 'objectId',        header: 'ID Objeto' },
            { field: 'codalm',          header: 'Cód. almacén' },
            { field: 'beginDate',       header: 'Fecha inicio' },
            { field: 'endDate',         header: 'Fecha fin' },
            { field: 'lastDocumentId',  header: 'Último doc.' },
            { field: 'lastError',       header: 'Fecha último error' },
            { field: 'lastMessage',     header: 'Último mensaje' },
            { field: 'lastTraceMessage',header: 'Traza' },
            { field: 'shopsInvolved',   header: 'Tiendas implicadas' }
        ];
    }

    //Consulta que se realiza a la API para buscar logs
    consultarLogs() {
        this.loading = true;
        this.errorMessage = null;

        this.integrationErrorsService.getErrors().subscribe({
            next: (data) => {
                this.logs = data ?? [];
                this.loading = false;
                this.foundLogErrors = this.logs.length > 0; //true
            },
            error: (error) => {
                console.error(error);
                this.loading = false;
                this.errorMessage = 'Error al recuperar los logs de integración.';
                this.foundLogErrors = false;
            }
        });
    }

    //Funcion para mostrar la traza del error
    showTraceDialog(log: EntityIntegrationLogBean) {
        this.currentTraceMessage = log.lastTraceMessage ?? '';
        this.traceDialogVisible = true;
    }

    //Funcion para exportar el csv de los datos de la tabla (OPCIONAL)
    exportCSV() {
        this.dt.exportCSV();
    }

    //Funcion para borrar los logs
    borrar() {
    
    if (this.selectedLogs.length === 0) {
        return;
    }

    const borrarTodos = this.selectedLogs.length === this.logs.length;

    if (borrarTodos) {
        //TODOS seleccionados → DELETE /errors
        if (!confirm('¿Seguro que quieres borrar TODOS los errores?')) {
        return;
        }

        this.loading = true;
        this.errorMessage = null;

        //método DELETE /errors
        this.integrationErrorsService.deleteAllErrors().subscribe({
        next: () => {
            this.loading = false;
            this.selectedLogs = [];
            this.consultarLogs();  // recarga la lista
        },
        error: (err) => {
            console.error(err);
            this.loading = false;
            this.errorMessage = 'Error al borrar todos los errores.';
        }
        });

    } else {

        //caso: solo algunos seleccionados → DELETE /errors/{errorUid}
        if (!confirm(`¿Borrar ${this.selectedLogs.length} error(es) seleccionado(s)?`)) {
        return;
        }

        this.loading = true;
        this.errorMessage = null;

        const peticiones = this.selectedLogs
        .filter(log => !!log.errorUid)
        .map(log =>
            //método DELETE /errors/{errorUid}
            this.integrationErrorsService.deleteError(log.errorUid as string)
        );

        if (peticiones.length === 0) {
        this.loading = false;
        return;
        }

        forkJoin(peticiones).subscribe({
        next: () => {
            this.loading = false;
            this.selectedLogs = [];
            this.consultarLogs();  // recarga lista ya sin los borrados
        },
        error: (err) => {
            console.error(err);
            this.loading = false;
            this.errorMessage = 'Error al borrar los errores seleccionados.';
        }
        });
    }
    }
}
