package com.myevent.eventos.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.EventoInteresseCliente;
import com.myevent.eventos.entity.Vendedor;

public interface EventoInteresseClienteRepository extends JpaRepository<EventoInteresseCliente, Long> {
	Optional<EventoInteresseCliente> findByClienteAndEvento(Cliente cliente, Evento evento);

    List<EventoInteresseCliente> findByClienteId(Long clienteId);
    List<EventoInteresseCliente> findByEventoId(Long eventoId);
    
    @Query("SELECT eic.cliente FROM EventoInteresseCliente eic WHERE eic.dataCadastro = :dataCadastro")
    List<Cliente> findClientesByDataCadastro(@Param("dataCadastro") Date dataCadastro);
    
    @Query("SELECT eic.cliente FROM EventoInteresseCliente eic WHERE eic.cliente.vendedor = :vendedor AND eic.dataCadastro = :dataCadastro")
    List<Cliente> findClientesByVendedorAndDataCadastro(@Param("vendedor") Vendedor vendedor, @Param("dataCadastro") Date dataCadastro);
}
