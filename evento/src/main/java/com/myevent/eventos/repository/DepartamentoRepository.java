package com.myevent.eventos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myevent.eventos.entity.Departamento;

public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {

}
