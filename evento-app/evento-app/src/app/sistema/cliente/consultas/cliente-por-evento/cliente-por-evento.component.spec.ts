import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePorEventoComponent } from './cliente-por-evento.component';

describe('ClientePorEventoComponent', () => {
  let component: ClientePorEventoComponent;
  let fixture: ComponentFixture<ClientePorEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePorEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePorEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
