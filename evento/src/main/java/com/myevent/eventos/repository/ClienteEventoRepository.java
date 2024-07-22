package com.myevent.eventos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.ClienteEvento;

public interface ClienteEventoRepository extends JpaRepository<ClienteEvento, Long>{

}
