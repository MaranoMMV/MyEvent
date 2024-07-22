package com.myevent.eventos.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.EventoCliente;

public interface EventoClienteRepository extends JpaRepository<EventoCliente, Long>{
	Optional<EventoCliente> findByClienteAndEvento(Cliente cliente, Evento evento);

    List<EventoCliente> findByClienteId(Long clienteId);
}
