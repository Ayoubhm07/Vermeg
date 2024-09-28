package com.bezkoder.springjwt.security.oauth2.exception;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;

public class OAuth2AuthenticationProcessingException extends AuthenticationException {

    public OAuth2AuthenticationProcessingException(String msg, Throwable t) {
        super(String.valueOf(new OAuth2Error("oauth2_processing_error", msg, null)), t);
    }

    public OAuth2AuthenticationProcessingException(String msg) {
        super(String.valueOf(new OAuth2Error("oauth2_processing_error", msg, null)));
    }
}
