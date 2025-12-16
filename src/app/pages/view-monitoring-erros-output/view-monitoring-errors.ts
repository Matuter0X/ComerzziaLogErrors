import { Component, inject } from '@angular/core';
import { MonitorControllerService } from '@/openapi/openapi-czz-to-erp-output/index';
import { monitorControllerConfigBean, monitorControllerEntitiesBean, MonitorControllerEntityTypeBean, MonitorControllerHealthBean, MonitorControllerMetricsBean, MonitorControllerStatusBean } from '@/openapi/openapi-czz-to-erp-output/model/monitorControllerBean';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { TabsModule } from 'primeng/tabs'; // o el módulo de tabs de tu versión
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-view-monitoring-errors-output',
  imports: [CommonModule, TabsModule, ChartModule],
  templateUrl: './view-monitoring-errors-output.html',
  styleUrls: ['./view-monitoring-errors-output.scss'],
})
export class ViewMonitoringErrorsOutput {

  showConfig = false;
  // Estados para la UI
  loading: boolean = false;
  errorMessage: string | null = null;
  //Inyectamos el servicio de OpenApi
  private monitorControllerService = inject(MonitorControllerService);

  // Datos que vendrán de la API
  monitor_config: monitorControllerConfigBean | null = null;
  monitor_health: MonitorControllerHealthBean | null = null;
  monitor_status: MonitorControllerStatusBean | null = null;
  monitor_metrics: MonitorControllerMetricsBean | null = null;
  monitor_entities: monitorControllerEntitiesBean[] = [];
  monitor_entities_type: MonitorControllerEntityTypeBean | null = null;

  entitiesLineData: any;
  entitiesBarData: any;
  entitiesLineOptions: any;
  entitiesBarOptions: any;

  //Metodo para esconder el contenido de configuracion del sistema
  toggleConfig(): void {
    this.showConfig = !this.showConfig;
  }

  //Datos que se recogen de la API al cargar la página
  ngOnInit() {
    //Cargamos todas las llamadas necesarias a las apis
    this.getMonitorConfig();
    this.getMonitorStatus();
    this.getMonitorHealth();
    this.loadConfiguredEntities();
  }

  //Recoger datos del config monitor
  getMonitorConfig() {
    this.loading = true;
    this.errorMessage = null;

    this.monitorControllerService.getConfig().subscribe({
      next: (data) => {
        this.monitor_config = data ?? null;
        this.loading = false;
        this.buildTopicsConfigRows();
      },
      error: (err) => {
        this.errorMessage = 'Error cargando configuración';
        this.loading = false;
      }
    });
  }

  getMonitorStatus() {
    this.loading = true;
    this.errorMessage = null;

    this.monitorControllerService.getStatus().subscribe({
      next: (data) => {
        this.monitor_status = data ?? null;
        this.loading = false;
        this.buildTopicsConfigRows();
      },
      error: (err) => {
        this.errorMessage = 'Error cargando configuración';
        this.loading = false;
      }
    });
  }

  getMonitorHealth() {
    this.loading = true;
    this.errorMessage = null;

    this.monitorControllerService.getHealth().subscribe({
      next: (data) => {
        this.monitor_health = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error cargando configuración';
        this.loading = false;
      }
    });
  }

  formatSuccessRate(rate: number | undefined | null): string {
    if (rate == null) return '0%';
    return (rate * 100).toFixed(1) + '%';
  }

  formatUptime(ms: number | undefined | null): string {
    if (!ms) return '0d 0h';
    const totalHours = Math.floor(ms / 1000 / 60 / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    return `${days}d ${hours}h`;
  }

  isHealthHealthy(): boolean {
    return (
      this.monitor_health?.health === 'HEALTHY' &&
      this.monitor_health?.status === 'HEALTHY'
    );
  }

  getMonitorEntities() {
    this.loading = true;
    this.errorMessage = null;

    this.monitorControllerService.getEntities().subscribe({
      next: (data) => {
        this.monitor_entities = data ?? null;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error cargando configuración';
        this.loading = false;
      }
    });
  }

  getMonitorEntitiesType(tipo: any) {
    this.loading = true;
    this.errorMessage = null;

    this.monitorControllerService.getEntityConfig(tipo).subscribe({
      next: (data) => {
        this.monitor_entities_type = data ?? null;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error cargando configuración';
        this.loading = false;
      }
    });
  }

  getMonitorMetricsEntities(type: any) {
    forkJoin({
      entities: this.monitorControllerService.getEntities(),
      entitiestype: this.monitorControllerService.getEntityConfig(type)
    }).subscribe(({ entities, entitiestype }) => {
      const resultado = entities.map(u => ({
        entitiestype: entities.filter(p => p.name === u.name)
      }));
    });
  }

  configuredEntitiesRows: Array<{
    type?: string;
    name?: string;
    serviceBean?: string;
    received: number;
    success: number;
    failure: number;
    successRate: number | null;
    avgTimeMs: number;
    status: 'ACTIVE' | 'INACTIVE';
  }> = [];

  topicsConfigRows: Array<{
    entity: string;
    main_topic: string;
    dlqTopic: string;
    consumerGroup: string;
    status: 'CONNECTED' | 'DISCONNECTED';
  }> = [];

  loadConfiguredEntities() {
    this.loading = true;
    this.errorMessage = null;

    forkJoin({
      entities: this.monitorControllerService.getEntities(),
      metrics: this.monitorControllerService.getMetrics()
    }).subscribe({
      next: ({ entities, metrics }) => {
        const metricsEntities = metrics?.entities ?? {};
        this.configuredEntitiesRows = (entities ?? []).map(entity => {
          const name = entity.name ?? '';

          // Buscamos en metrics.entities por el nombre (promotions, rates, warehouse, etc.)
          const m = (metricsEntities as any)[name] as
            | {
              process_time_avg: number;
              success: number;
              failure: number;
              received: number;
            }
            | undefined;

          const received = m?.received ?? 0;
          const success = m?.success ?? 0;
          const failure = m?.failure ?? 0;
          const avgTimeMs = m?.process_time_avg ?? 0;
          const successRate =
            received > 0 ? (success / received) * 100 : null;

          const status: 'ACTIVE' | 'INACTIVE' =
            received === 0 && success === 0 && failure === 0
              ? 'INACTIVE'
              : 'ACTIVE';

          return {
            type: entity.type,
            name: entity.name,
            serviceBean: entity.serviceBean,
            received,
            success,
            failure,
            successRate,
            avgTimeMs,
            status
          };
        });
        this.initEntitiesCharts();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error cargando entidades configuradas';
        this.loading = false;
      }
    });
  }

  private buildTopicsConfigRows(): void {
    if (!this.monitor_config) {
      this.topicsConfigRows = [];
      return;
    }

    // estado general del consumidor (lo usamos como estado de los topics)
    const isConnected =
      this.monitor_status?.consumer?.running &&
      this.monitor_status?.consumer?.healthy;

    const statusLabel: 'CONNECTED' | 'DISCONNECTED' =
      isConnected ? 'CONNECTED' : 'DISCONNECTED';

    this.topicsConfigRows = [
      {
        entity: 'tickets',
        main_topic: this.monitor_config?.entities.tickets.main_topic ?? '-',
        dlqTopic: this.monitor_config?.entities.tickets.dlq_topic ?? '-',
        consumerGroup: this.monitor_status?.entities.tickets.groupId ?? 'N/A',
        status: statusLabel,
      },
      {
        entity: 'cashjournal',
        main_topic: this.monitor_config?.entities.cashjournal.main_topic ?? '-',
        dlqTopic: this.monitor_config?.entities.cashjournal.dlq_topic ?? '-',
        consumerGroup: this.monitor_status?.entities.cashjournal.groupId ?? 'N/A',
        status: statusLabel,
      },
    ];
  }

  private initEntitiesCharts(): void {
    const rows = this.configuredEntitiesRows ?? [];

    const labels = rows.map(r => (r.name ?? r.type ?? '—') as string);

    // Counts (bar) => enteros >= 0
    const received = rows.map(r => Math.max(0, Math.round(Number((r as any).received ?? 0))));
    const success = rows.map(r => Math.max(0, Math.round(Number((r as any).success ?? 0))));
    const failure = rows.map(r => Math.max(0, Math.round(Number((r as any).failure ?? 0))));

    // Success rate => entero 0..100
    const successRatePct = rows.map(r => {
      const v = Number((r as any).successRate ?? 0);
      if (!Number.isFinite(v) || v <= 0) return 0;
      return Math.min(Math.round(v), 100);
    });

    // Avg time => ms enteros >= 0
    const avgTimeMs = rows.map(r => {
      const v = Number((r as any).avgTimeMs ?? 0);
      if (!Number.isFinite(v) || v <= 0) return 0;
      return Math.max(0, Math.round(v));
    });

    // Helpers
    const formatTime = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${ms} ms`);

    const niceMax = (value: number) => {
      if (value <= 1) return 1;
      const pow = Math.pow(10, Math.floor(Math.log10(value)));
      const n = value / pow;
      const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
      return step * pow;
    };

    // Theme tokens (PrimeNG / CSS vars)
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // -------- BAR (volumen) --------
    this.entitiesBarData = {
      labels,
      datasets: [
        {
          label: 'Received',
          backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
          borderColor: documentStyle.getPropertyValue('--p-primary-200'),
          data: received,
        },
        {
          label: 'Success',
          backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
          borderColor: documentStyle.getPropertyValue('--p-primary-500'),
          data: success,
        },
        {
          label: 'Failures',
          backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
          borderColor: documentStyle.getPropertyValue('--p-red-500'),
          data: failure,
        },
      ],
    };

    // Rango “bonito” para el bar, con cap opcional (50)
    const BAR_CAP = 50;
    const barMaxVal = Math.max(0, ...received, ...success, ...failure);
    const barPadded = barMaxVal > 0 ? Math.ceil(barMaxVal * 1.1) : 10;
    const barMaxNice = Math.min(BAR_CAP, niceMax(barPadded));
    const barMaxFinal = Math.max(10, barMaxNice); // mínimo 10 para legibilidad

    this.entitiesBarOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: { labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
          },
        },
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary, font: { weight: 500 } },
          grid: { display: false, drawBorder: false },
        },
        y: {
          beginAtZero: true,
          max: barMaxFinal,
          ticks: { color: textColorSecondary, precision: 0 },
          grid: { color: surfaceBorder, drawBorder: false },
        },
      },
    };

    // -------- LINE (Success Rate + Avg Time) --------
    this.entitiesLineData = {
      labels,
      datasets: [
        {
          label: 'Success Rate (%)',
          data: successRatePct,
          yAxisID: 'ySuccess',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-green-500'),
          backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
          tension: 0.4,
        },
        {
          label: 'Avg Time (ms)',
          data: avgTimeMs,
          yAxisID: 'yTime',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-orange-500'),
          backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
          tension: 0.4,
        },
      ],
    };

    // Auto–rango “bonito” para ms (nunca negativo y nunca queda centrado)
    const maxAvg = Math.max(0, ...avgTimeMs);
    const timePadded = maxAvg > 0 ? Math.ceil(maxAvg * 1.1) : 1;
    const yTimeMax = niceMax(timePadded);

    this.entitiesLineOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: { labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              const label = String(ctx.dataset.label ?? '');
              const y = Number(ctx.parsed?.y ?? 0);
              if (label.includes('Success Rate')) return `${label}: ${y}%`;
              return `${label}: ${formatTime(y)}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary, font: { weight: 500 } },
          grid: { display: false, drawBorder: false },
        },
        ySuccess: {
          type: 'linear',
          position: 'left',
          min: 0,
          max: 100,
          ticks: {
            color: textColorSecondary,
            precision: 0,
            callback: (v: number) => `${v}%`,
          },
          grid: { color: surfaceBorder, drawBorder: false },
        },
        yTime: {
          type: 'linear',
          position: 'right',
          min: 0,
          max: BAR_CAP,
          ticks: {
            color: textColorSecondary,
            precision: 0,
            callback: (v: number) => (v >= 1000 ? `${(Number(v) / 1000).toFixed(1)} s` : `${v} ms`),
          },
          grid: { drawOnChartArea: false },
        },
      },
    };
  }
}
