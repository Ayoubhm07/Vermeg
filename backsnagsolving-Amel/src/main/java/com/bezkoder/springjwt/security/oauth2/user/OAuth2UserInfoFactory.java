package com.bezkoder.springjwt.security.oauth2.user;

import com.bezkoder.springjwt.security.oauth2.exception.OAuth2AuthenticationProcessingException;
import com.bezkoder.springjwt.security.oauth2.user.GoogleOAuth2UserInfo;
import com.bezkoder.springjwt.security.oauth2.user.GithubOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase("google")) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase("github")) {
            return new GithubOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
