import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhirSearchFieldComponent } from './fhir-search-field.component';

describe('FhirSearchFieldComponent', () => {
  let component: FhirSearchFieldComponent;
  let fixture: ComponentFixture<FhirSearchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhirSearchFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhirSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
