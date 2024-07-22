package com.myevent.eventos.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String razao;
    private String telefone;
    private String email;
    private String cnpj;
    private String data;
    private Boolean aceitaReceberEmails;

    @ManyToOne
    private Vendedor vendedor;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "evento_cliente",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "evento_id"))
    @JsonIgnore
    private List<Evento> eventos = new ArrayList<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "evento_interesse_cliente",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "evento_interesse_id"))
    @JsonIgnore
    private List<Evento> eventosInteresse = new ArrayList<>();

   
}
