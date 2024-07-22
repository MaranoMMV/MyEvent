import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteGeralComponent } from './cliente-geral.component';

describe('ClienteGeralComponent', () => {
  let component: ClienteGeralComponent;
  let fixture: ComponentFixture<ClienteGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteGeralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
