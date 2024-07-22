package com.myevent.eventos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    Evento findTopByOrderByIdDesc();
    List<Evento> findByclientesId(Long clienteId);

//    @Query("SELECT COUNT(c) FROM Evento e JOIN e.clientes c WHERE e.id = :eventoId")
//    Long countClientesByEventoId(Long eventoId);

}
