package com.myevent.eventos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.EventoInteresse;

public interface EventoInteresseRepository extends JpaRepository<EventoInteresse, Long> {
}
