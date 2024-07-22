package com.myevent.eventos.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.EventoInteresseCliente;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.EventoDTO;
import com.myevent.eventos.repository.ClienteRepository;
import com.myevent.eventos.repository.EventoRepository;

@Service
public class EventoService {

	@Autowired
	private EventoRepository eventoRepository;
	@Autowired
	private VendedorService vendedorService;
	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private EventoInteresseClienteService eventoInteresseClienteService;


	public Evento saveEvento(Long id, EventoDTO eventoDTO) throws ParseException {

		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 1) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {

			// Gera um objeto de Evento
			Evento evento = new Evento();
			// Gera um padrão de data de formatação
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

//			// Pega a data gerada e transforma no padrão dateFormat
//			Date startDate = dateFormat.parse(eventoDTO.getStart());
//			Date endDate = dateFormat.parse(eventoDTO.getEndDate());
//
//			// Transformando DTO em OBJ
//			evento.setStart(startDate);
//			evento.setEndDate(endDate);
			evento.setNome(eventoDTO.getNome());
			return eventoRepository.save(evento);
		} else {
			return null;
		}
	}

	// Procura o evento por id, caso ele não encontre ocorre o erro NOT_FOUND
	public Evento findEventoById(Long id) {
		return this.eventoRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));
	}

	// Lista todos os eventos por ordem de id
	public List<Evento> listEventos(Long id) {
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 1) {
			return null;
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {
		return this.eventoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		}else {
			return null;
		}
	}

	// Função de delete evento, utiliza caso não tenha nenhum cliente vinculado a
	// ela. caso contrario não sera apagada.
	public void deleteEventoById(Long id) {
		// procura o evento por id, se ele existir ele mapeia ele e deleta, se não
		// existir ele aparece o erro
		this.eventoRepository.findById(id).map(evento -> {
			eventoRepository.delete(evento);
			return Void.TYPE;
		}).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado para ser apagado"));
	}

	public void modifyEvento(Long id, Evento eventoAlterado, Long idVendedor) {
		Vendedor vendedor = this.vendedorService.findVendedorById(id);
		Long idDepartamento = vendedor.getDepartamento().getId();
		if (idDepartamento == 1 ) {
			
		} else if (idDepartamento == 2 || idDepartamento == 3 ) {
		this.eventoRepository.findById(id).map(evento -> {
			evento.setNome(eventoAlterado.getNome());
			return eventoRepository.save(evento);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		}
	}

	public Evento buscarUltimoEvento() {
		return this.eventoRepository.findTopByOrderByIdDesc();
	}

	public List<Evento> listagemClientesOpcoes(){
		return this.eventoRepository.findAll();
	}
	
	public List<Cliente> buscarClientesPorEvento(Long eventoId, Long idVendedor) {
	    Vendedor vendedor = this.vendedorService.findVendedorById(idVendedor);
	    Long idDepartamento = vendedor.getDepartamento().getId();

	    if (idDepartamento == 1 ) {
	        // Retornar apenas os clientes vinculados ao vendedor e ao evento
	        return clienteRepository.buscarClientesPorEventoEIdVendedor(eventoId, idVendedor);
	    } else if (idDepartamento == 2 || idDepartamento == 3 ) {
	        // Caso o departamento seja 3, 4, 5 ou 6, retorna a lista de clientes por evento
	        return clienteRepository.buscarClientesPorEvento(eventoId);
	    } else {
	        // Outros departamentos retornam null, você pode ajustar conforme necessário
	        return null;
	    }
	}
	
	public List<Cliente> buscarClientesPorEventoInteresse(Long eventoInteresseId, Long idVendedor) {
	    Vendedor vendedor = vendedorService.findVendedorById(idVendedor);
	    Long idDepartamento = vendedor.getDepartamento().getId();

	    if (idDepartamento == 1 ) {
	        // Retorna apenas os clientes vinculados ao vendedor e ao evento de interesse
	        List<Cliente> clientes = clienteRepository.buscarClientesPorEventoInteresseEIdVendedor(eventoInteresseId, idVendedor);
	        return clientes;
	    } else if (idDepartamento == 2 || idDepartamento == 3) {
	        // Retorna a lista de clientes por evento de interesse
	        List<EventoInteresseCliente> eventoInteresseClienteList = eventoInteresseClienteService.listagemDeEventoInteressePorEvento(eventoInteresseId);
	        
	        // Mapear a lista de EventoInteresseCliente para uma lista de Cliente
	        List<Cliente> clientes = eventoInteresseClienteList.stream()
	                                          .map(EventoInteresseCliente::getCliente)
	                                          .collect(Collectors.toList());
	        
	        return clientes;
	    } else {
	        // Outros departamentos retornam null, ajuste conforme necessário
	        return null;
	    }
	}
	
	
	
}
