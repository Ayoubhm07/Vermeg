package com.bezkoder.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bezkoder.springjwt.models.Domaine;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {

	Domaine findByName(String motApresArobase);

}
