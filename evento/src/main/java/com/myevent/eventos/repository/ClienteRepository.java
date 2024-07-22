package com.myevent.eventos.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.myevent.eventos.entity.Cliente;
import com.myevent.eventos.entity.Vendedor;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    Optional<Cliente> findByCnpj(String cnpj);
    List<Cliente> findByVendedorId(Long vendedorId);

    @Query("SELECT c FROM Cliente c WHERE c.vendedor = :vendedor")
    List<Cliente> findByVendedor(Vendedor vendedor);
    

    @Query("SELECT c FROM Cliente c JOIN c.eventos e WHERE e.id = :idEvento")
    List<Cliente> buscarClientesPorEvento(@Param("idEvento") Long idEvento);
    
    @Query("SELECT c FROM Cliente c JOIN c.eventos e WHERE e.id = :idEvento AND c.vendedor.id = :idVendedor")
    List<Cliente> buscarClientesPorEventoEIdVendedor(@Param("idEvento") Long idEvento, @Param("idVendedor") Long idVendedor);
    
    @Query("SELECT c FROM Cliente c JOIN EventoInteresseCliente eic ON c.id = eic.cliente.id WHERE eic.evento.id = :eventoId AND c.vendedor.id = :vendedorId")
    List<Cliente> buscarClientesPorEventoInteresseEIdVendedor(@Param("eventoId") Long eventoId, @Param("vendedorId") Long vendedorId);

    @Query("SELECT c FROM Cliente c JOIN EventoInteresseCliente eic ON c.id = eic.cliente.id WHERE eic.evento.id = :eventoId")
    List<Cliente> buscarClientesPorEventoInteresse(@Param("eventoId") Long eventoId);
    
}
