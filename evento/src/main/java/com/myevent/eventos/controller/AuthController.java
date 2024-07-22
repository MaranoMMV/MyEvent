package com.myevent.eventos.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.entity.dto.LoginRequestDTO;
import com.myevent.eventos.entity.dto.RegisterRequestDTO;
import com.myevent.eventos.entity.dto.ResponseDTO;
import com.myevent.eventos.infra.security.TokenService;
import com.myevent.eventos.repository.VendedorRepository;
@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:4200")
public class AuthController {
    private final VendedorRepository vendedorRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthController(VendedorRepository vendedorRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.vendedorRepository = vendedorRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body){
        Vendedor vendedor = this.vendedorRepository.findByUsuario(body.usuario()).orElseThrow(() -> new RuntimeException("User not found"));
        if (!vendedor.getStatus()) {
            return ResponseEntity.badRequest().build();
        }
        if(passwordEncoder.matches(body.password(), vendedor.getPassword())) {
            String token = this.tokenService.generateToken(vendedor);
            return ResponseEntity.ok(new ResponseDTO(vendedor.getId(), vendedor.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequestDTO body){
        Optional<Vendedor> vendedor = this.vendedorRepository.findByUsuario(body.usuario());

        if(vendedor.isEmpty()) {
            Vendedor novoVendedor = new Vendedor();
            novoVendedor.setPassword(passwordEncoder.encode(body.password()));
            novoVendedor.setUsuario(body.usuario());
            novoVendedor.setNome(body.name());
            this.vendedorRepository.save(novoVendedor);

            String token = this.tokenService.generateToken(novoVendedor);
            return ResponseEntity.ok(new ResponseDTO(novoVendedor.getId(), novoVendedor.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}

