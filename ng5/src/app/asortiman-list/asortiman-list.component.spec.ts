import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsortimanListComponent } from './asortiman-list.component';

describe('AsortimanListComponent', () => {
  let component: AsortimanListComponent;
  let fixture: ComponentFixture<AsortimanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsortimanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsortimanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
