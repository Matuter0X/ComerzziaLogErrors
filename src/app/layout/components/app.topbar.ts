import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/layout/service/layout.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MegaMenuModule } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: '[app-topbar]',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, FormsModule, ButtonModule, MegaMenuModule, BadgeModule],
    template: `
        <div class="layout-topbar-start">
            <a class="layout-topbar-logo" routerLink="/">
                <img
                    [src]="topbarLogo.src"
                    [class]="topbarLogo.class"
                    alt="Logo"
                />
            </a>
            <a #menuButton class="layout-menu-button" (click)="onMenuButtonClick()">
                <i class="pi pi-chevron-right"></i>
            </a>
            <button class="app-config-button app-config-mobile-button" (click)="toggleConfigSidebar()">
                <i class="pi pi-cog"></i>
            </button>
        </div>

        <div class="layout-topbar-end">
            <div class="layout-topbar-actions-start">
                <h1 class="text-xl">CONSULTA ERRORES DE INTERFACES</h1>
            </div>
            <div class="layout-topbar-actions-end">
                <ul class="layout-topbar-items">
                    <li>
                        <button class="app-config-button" (click)="toggleConfigSidebar()">
                            <i class="pi pi-cog"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    `,
    host: {
        class: 'layout-topbar'
    },
    styles: `
        :host ::ng-deep .p-overlaybadge .p-badge {
            outline-width: 0px;
        }
    `
})
export class AppTopbar {

    constructor(public layoutService: LayoutService) { }

    get topbarLogo() {

        const menuMode = this.layoutService._config.menuMode;

        const isSlim = menuMode === 'slim' || menuMode === 'slim-plus';

        if (isSlim) {
            return {
                src: '/images/favicon.png',          // o isotipo
                class: 'topbar-logo topbar-logo--slim'
            };
        }

        return {
            src: '/images/logo.png',
            class: 'h-45'
        };
    }

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {
        this.layoutService.openRightMenu();
    }

    toggleConfigSidebar() {
        let layoutState = this.layoutService.layoutState();

        if (this.layoutService.isSidebarActive()) {
            layoutState.overlayMenuActive = false;
            layoutState.overlaySubmenuActive = false;
            layoutState.staticMenuMobileActive = false;
            layoutState.menuHoverActive = false;
            layoutState.configSidebarVisible = false;
        }
        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
        this.layoutService.layoutState.set({ ...layoutState });
    }

    focusSearchInput() {
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 150);
    }

    onTopbarMenuToggle() {
        this.layoutService.layoutState.update((val) => ({ ...val, topbarMenuActive: !val.topbarMenuActive }));
    }
}
