package com.bezkoder.springjwt.security;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.oauth2.user.OAuth2UserInfo;
import com.bezkoder.springjwt.security.oauth2.user.OAuth2UserInfoFactory;
import com.bezkoder.springjwt.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Use OAuth2Error to construct OAuth2AuthenticationException
            OAuth2Error oauth2Error = new OAuth2Error("invalid_request", ex.getMessage(), null);
            throw new OAuth2AuthenticationException(oauth2Error, ex);
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        if (oAuth2UserInfo.getEmail() == null) {
            OAuth2Error oauth2Error = new OAuth2Error("invalid_request", "Email not found from OAuth2 provider", null);
            throw new OAuth2AuthenticationException(oauth2Error, "Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Update existing user
            user.setUsername(oAuth2UserInfo.getName());
            userRepository.save(user);
        } else {
            // Create new user
            user = new User();
            user.setUsername(oAuth2UserInfo.getName());
            user.setEmail(oAuth2UserInfo.getEmail());
            userRepository.save(user);
        }

        return (OAuth2User) UserDetailsImpl.build(user);
    }

}
