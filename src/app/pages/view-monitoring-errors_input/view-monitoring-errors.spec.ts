import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitoringErrors } from './view-monitoring-errors';

describe('ViewMonitoringErrors', () => {
  let component: ViewMonitoringErrors;
  let fixture: ComponentFixture<ViewMonitoringErrors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMonitoringErrors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMonitoringErrors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
