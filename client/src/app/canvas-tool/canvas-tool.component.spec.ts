import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasToolComponent } from './canvas-tool.component';

describe('CanvasToolComponent', () => {
  let component: CanvasToolComponent;
  let fixture: ComponentFixture<CanvasToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
