import { Component, computed, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { AppMenu } from './app.menu';
import { CommonModule } from '@angular/common';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: '[app-sidebar]',
    standalone: true,
    imports: [AppMenu, CommonModule],
    template: `<div class="layout-sidebar" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
        
    <div class="layout-sidebar-top">
            <a href="/">
                <img src="/images/logo.png" alt="Logo Text" class="layout-sidebar-logo h-45" />
                <img src="/images/favicon.png" alt="Logo" class="layout-sidebar-logo-slim" />
            </a>
            <button class="layout-sidebar-anchor" type="button" (click)="anchor()"></button>
        </div>
        <div app-menu-profile #menuProfileStart *ngIf="menuProfilePosition() === 'start'"></div>
        <div #menuContainer class="layout-menu-container">
            <div app-menu></div>
        </div>
    </div>`
})
export class AppSidebar implements OnDestroy {
    el = inject(ElementRef);

    layoutService = inject(LayoutService);

    @ViewChild(AppMenu) appMenu!: AppMenu;

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    overlayMenuActive = computed(() => this.layoutService.layoutState().overlayMenuActive);

    menuProfilePosition = computed(() => this.layoutService.layoutConfig().menuProfilePosition);

    anchored = computed(() => this.layoutService.layoutState().anchored);

    timeout: any;

    menuMode = computed(() => this.layoutService.layoutConfig().menuMode);
    sidebarActive = computed(() => this.layoutService.layoutState().sidebarActive);

    isSlim = computed(() => this.menuMode() === 'slim' || this.menuMode() === 'slim-plus');

    showFullLogo = computed(() =>
        !this.isSlim() || this.sidebarActive() || this.anchored()
    );


    resetOverlay() {
        if (this.overlayMenuActive()) {
            this.layoutService.layoutState.update((val) => ({ ...val, overlayMenuActive: false }));
        }
    }

    onMouseEnter() {
        if (!this.anchored()) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.layoutService.layoutState.update((val) => ({ ...val, sidebarActive: true }));
        }
    }

    onMouseLeave() {
        if (!this.anchored()) {
            if (!this.timeout) {
                this.timeout = setTimeout(() => this.layoutService.layoutState.update((val) => ({ ...val, sidebarActive: false })), 300);
            }
        }
    }

    anchor() {
        this.layoutService.layoutState.update((val) => ({ ...val, anchored: !val.anchored }));
    }

    ngOnDestroy() {
        this.resetOverlay();
    }
}
