import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteIdComponent } from './cliente-id.component';

describe('ClienteIdComponent', () => {
  let component: ClienteIdComponent;
  let fixture: ComponentFixture<ClienteIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
