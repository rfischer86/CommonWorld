import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OsmComponent } from './osm.component';

describe('OsmComponent', () => {
  let component: OsmComponent;
  let fixture: ComponentFixture<OsmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
