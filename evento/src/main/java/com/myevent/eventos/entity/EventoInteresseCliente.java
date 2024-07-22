package com.myevent.eventos.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "evento_interesse_cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoInteresseCliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "evento_interesse_id")
	private Evento evento;

	@ManyToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;
	
    @Temporal(TemporalType.DATE)
    private Date dataCadastro;

}
