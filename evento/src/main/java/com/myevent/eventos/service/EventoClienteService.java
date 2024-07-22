package com.myevent.eventos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.EventoCliente;
import com.myevent.eventos.repository.EventoClienteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoClienteService {
	
	@Autowired
	private final EventoClienteRepository eventoClienteRepository;
	
	public List<EventoCliente> listagemDeEvento(Long id){
		return this.eventoClienteRepository.findByClienteId(id);
	}
	
	
	public EventoCliente salvarEventoCliente(Cliente cliente, Evento evento) {
	    Optional<EventoCliente> eventoClienteExistente = eventoClienteRepository.findByClienteAndEvento(cliente, evento);
	    
	    if (eventoClienteExistente.isPresent()) {
	        return null; // Já existe um eventoCliente para este cliente e evento
	    } else {
	        EventoCliente novoEventoCliente = new EventoCliente();
	        novoEventoCliente.setCliente(cliente);
	        novoEventoCliente.setEvento(evento);
	        return eventoClienteRepository.save(novoEventoCliente);
	    }
	}

}
