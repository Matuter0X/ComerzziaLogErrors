import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu, [app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: ` <ul class="layout-menu" #menuContainer>
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul>`
})
export class AppMenu {
    el: ElementRef = inject(ElementRef);

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    model: MenuItem[] = [
        {
            label: 'Menú Principal',
            icon: 'pi pi-home',
            items: [
                    {
                        label: 'Visor de Errores',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/view-errors']
                    },
                    {
                        label: 'Monitorizar Entrada',
                        icon: 'pi pi-fw pi-arrow-circle-right',
                        routerLink: ['/view-monitoring-errors-input']
                    },
                    {
                        label: 'Monitorizar Salida',
                        icon: 'pi pi-fw pi-arrow-circle-left',
                        routerLink: ['/view-monitoring-errors-output']
                    }
                ]
        }
    ];
}
