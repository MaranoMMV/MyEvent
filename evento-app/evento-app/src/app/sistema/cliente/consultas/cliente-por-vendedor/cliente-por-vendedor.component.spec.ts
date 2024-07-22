import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePorVendedorComponent } from './cliente-por-vendedor.component';

describe('ClientePorVendedorComponent', () => {
  let component: ClientePorVendedorComponent;
  let fixture: ComponentFixture<ClientePorVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientePorVendedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePorVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
