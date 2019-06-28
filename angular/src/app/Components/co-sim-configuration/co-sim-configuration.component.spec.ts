import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoSimConfigurationComponent } from './co-sim-configuration.component';

describe('CoSimConfigurationComponent', () => {
  let component: CoSimConfigurationComponent;
  let fixture: ComponentFixture<CoSimConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoSimConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoSimConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
