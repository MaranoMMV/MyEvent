package com.myevent.eventos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.Evento;
import com.myevent.eventos.entity.Local;

public interface LocalRepository extends JpaRepository<Local, Long>{

	List<Local> findByEvento(Evento evento);
}
