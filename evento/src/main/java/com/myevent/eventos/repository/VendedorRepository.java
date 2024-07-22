package com.myevent.eventos.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.myevent.eventos.entity.Vendedor;

public interface VendedorRepository extends JpaRepository<Vendedor, Long>{
    Optional<Vendedor> findByUsuario(String usuario);

    @Query("SELECT v FROM Vendedor v WHERE v.departamento.id IN :departamentoIds ORDER BY v.nome")
    List<Vendedor> findByDepartamentos(@Param("departamentoIds") List<Long> departamentoIds);

    @Query("SELECT v FROM Vendedor v WHERE v.status = true")
    List<Vendedor> findVendedoresAtivos();

    @Query("SELECT v FROM Vendedor v WHERE v.status IS NULL OR v.status = false")
    List<Vendedor> findVendedoresInativos();

    List<Vendedor> findByNome(String nome);
    
    Optional<Vendedor> getOneByNome(String nome);
    
    @Query("SELECT v FROM Vendedor v WHERE v.id = :id AND v.departamento.id IN :departamentoIds AND v.status = true")
    
    Optional<Vendedor> findActiveByIdAndDepartamentoIds(@Param("id") Long id, @Param("departamentoIds") List<Long> departamentoIds);
    
    Optional<Vendedor> findTopByNome(String nome);
}
