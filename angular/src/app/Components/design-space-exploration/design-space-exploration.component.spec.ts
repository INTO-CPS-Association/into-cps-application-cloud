import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSpaceExplorationComponent } from './design-space-exploration.component';

describe('DesignSpaceExplorationComponent', () => {
  let component: DesignSpaceExplorationComponent;
  let fixture: ComponentFixture<DesignSpaceExplorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSpaceExplorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSpaceExplorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
