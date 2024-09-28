package com.bezkoder.springjwt.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Domaine {
	 @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private Long id;
	 private  String name ;
	public Long getId() {
		return id;
	}
	public Domaine() {
		super();
	}
	public Domaine(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
