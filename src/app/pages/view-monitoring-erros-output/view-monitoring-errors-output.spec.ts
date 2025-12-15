import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonitoringErrorsOutput } from './view-monitoring-errors';

describe('ViewMonitoringErrors', () => {
  let component: ViewMonitoringErrorsOutput;
  let fixture: ComponentFixture<ViewMonitoringErrorsOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMonitoringErrorsOutput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMonitoringErrorsOutput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
