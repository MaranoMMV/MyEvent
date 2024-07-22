package com.myevent.eventos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.Horario;
import com.myevent.eventos.entity.Local;

public interface HorarioRepository extends JpaRepository<Horario, Long> {

	List<Horario> findByLocal(Local local);
}