package com.myevent.eventos.infra.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.myevent.eventos.entity.Vendedor;
import com.myevent.eventos.repository.VendedorRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private VendedorRepository vendedorRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Vendedor vendedor = this.vendedorRepository.findByUsuario(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(vendedor.getUsuario(), vendedor.getPassword(), new ArrayList<>());
    }
}
