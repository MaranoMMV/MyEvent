package com.myevent.eventos.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
@Entity
public class EventoInteresse extends Evento {

    public EventoInteresse(Long id, String nome, List<Cliente> clientes) {
        super(id, nome, clientes);
    }
	public EventoInteresse() {
		super();
	}

}
