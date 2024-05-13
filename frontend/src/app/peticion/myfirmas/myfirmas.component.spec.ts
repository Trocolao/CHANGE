import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfirmasComponent } from './myfirmas.component';

describe('MyfirmasComponent', () => {
  let component: MyfirmasComponent;
  let fixture: ComponentFixture<MyfirmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfirmasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
