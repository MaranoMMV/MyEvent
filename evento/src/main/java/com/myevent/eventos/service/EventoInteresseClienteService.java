package com.myevent.eventos.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.EventoInteresseCliente;
import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.repository.EventoInteresseClienteRepository;
import com.myevent.eventos.repository.VendedorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventoInteresseClienteService {

	private final EventoInteresseClienteRepository eventoInteresseClienteRepository;
	private final VendedorRepository vendedorRepository;

	public List<EventoInteresseCliente> listagemDeEventoInteresse(Long id){
		return this.eventoInteresseClienteRepository.findByClienteId(id);
	}

	public void salvarEventoCliente(Evento evento, Cliente cliente) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Optional<EventoInteresseCliente> eventoInteresseClienteExistente = eventoInteresseClienteRepository
				.findByClienteAndEvento(cliente, evento);

		if (eventoInteresseClienteExistente.isPresent()) {

		} else {

			EventoInteresseCliente eventoInteresseCliente = new EventoInteresseCliente();
			eventoInteresseCliente.setEvento(evento);
			eventoInteresseCliente.setCliente(cliente);
			eventoInteresseCliente.setDataCadastro(new Date());

			EventoInteresseCliente save = this.eventoInteresseClienteRepository.save(eventoInteresseCliente);
		}
	}

    public List<EventoInteresseCliente> listagemDeEventoInteressePorEvento(Long eventoInteresseId) {
        return eventoInteresseClienteRepository.findByEventoId(eventoInteresseId);
    }
    
    public List<Cliente> buscarClientesCadastradosHoje(Long id) {
    	Vendedor vendedorRequest = this.vendedorRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));	
		Long idDepartamento = vendedorRequest.getDepartamento().getId();
		Date hoje = new Date();
		if(idDepartamento == 1) {
			return this.eventoInteresseClienteRepository.findClientesByVendedorAndDataCadastro(vendedorRequest, hoje);
		}else if (idDepartamento == 2|| idDepartamento == 3 ) {
			return eventoInteresseClienteRepository.findClientesByDataCadastro(hoje);
			
		}
		else {
			return null;
		}
    }

    public List<Cliente> buscarClientesCadastradosOntem(Long id) {
    	Vendedor vendedorRequest = this.vendedorRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado!"));	
		Long idDepartamento = vendedorRequest.getDepartamento().getId();
		
		Date ontem = obterDataOntem();
		if(idDepartamento == 1 ) {
			return this.eventoInteresseClienteRepository.findClientesByVendedorAndDataCadastro(vendedorRequest,ontem);
		}else if (idDepartamento == 2 || idDepartamento == 3 ) {
			return eventoInteresseClienteRepository.findClientesByDataCadastro(ontem);
		}else {
			return null;
		}
		

    }

    private Date obterDataOntem() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1);
        return cal.getTime();
    }


}
