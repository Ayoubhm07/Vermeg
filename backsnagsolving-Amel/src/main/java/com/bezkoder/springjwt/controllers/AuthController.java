package com.bezkoder.springjwt.controllers;

import java.util.*;
import java.util.stream.Collectors;

import com.bezkoder.springjwt.models.*;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.bezkoder.springjwt.payload.request.LoginRequest;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.payload.response.JwtResponse;
import com.bezkoder.springjwt.payload.response.MessageResponse;
import com.bezkoder.springjwt.repository.DomaineRepository;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.jwt.JwtUtils;
import com.bezkoder.springjwt.security.services.UserDetailsImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    private JavaMailSender emailSender;
    @Autowired
    public AuthController(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(loginRequest.getUsername());
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<User> u =this.userRepository.findByUsername(userDetails.getUsername());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                u.get().getDomaine().getName(),
                roles));
    }
    @Autowired
    DomaineRepository domainerepos ;

    /*@PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();*/

   /* if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "ROLE_ADMIN":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "ROLE_MODERATOR":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }*/
       /* int index = signUpRequest.getEmail().indexOf("@");
        String motApresArobase = signUpRequest.getEmail().substring(index + 1);
        System.out.println("Le nom du domaine est : " + motApresArobase);
        Domaine d =this.domainerepos.findByName(motApresArobase);
        if(d!=null) {
            user.setDomaine(d);
        }
        else {
            Domaine newd=new Domaine();
            newd.setName(motApresArobase);
            this.domainerepos.save(newd);
            user.setDomaine(newd);
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }*/

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        int index = signUpRequest.getEmail().indexOf("@");
        String motApresArobase = signUpRequest.getEmail().substring(index + 1);
        Domaine d = this.domainerepos.findByName(motApresArobase);
        if (d != null) {
            user.setDomaine(d);
        } else {
            Domaine newd = new Domaine();
            newd.setName(motApresArobase);
            this.domainerepos.save(newd);
            user.setDomaine(newd);
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }



    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        System.out.println("Received email: " + email);
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            System.out.println("Email not found in database.");
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email not found!"));
        }

        User user = userOptional.get();
        String token = jwtUtils.generateResetToken(user);
        user.setResetPasswordToken(token);
        userRepository.save(user);

        String resetLink = "http://localhost:4200/auth/reset-password?token=" + token;
        sendResetEmail(user.getEmail(), resetLink);

        return ResponseEntity.ok(new MessageResponse("Password reset link has been sent to your email!"));
    }


    private void sendResetEmail(String to, String resetLink) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setFrom("amelacho3@gmail.com");
            helper.setTo(to);
            helper.setSubject("Password Reset Request");

            String logoUrl = "C://Users//amela//Desktop//springback//src//main//java//com//bezkoder//springjwt//logo-black.png";

            String emailContent = "<div style=\"text-align: center;\">"
                    + "<img src=\"" + logoUrl + "\" alt=\"SnagSolving Logo\" style=\"max-width:300px;\"/><br>"
                    + "<p>Dear user,</p>"
                    + "<p>We received a request to reset your password. Please click the link below to reset your password:</p>"
                    + "<p><a href=\"" + resetLink + "\">Reset my password</a></p>"
                    + "<p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>"
                    + "<p>Thank you,<br>Snag Solving</p>"
                    + "</div>";

            helper.setText(emailContent, true);

            emailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequest passwordResetRequest) {
        Optional<User> userOptional = userRepository.findByResetPasswordToken(passwordResetRequest.getToken());
        System.out.println("tokennn: " + userOptional);

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid token!"));
        }

        User user = userOptional.get();
        user.setPassword(encoder.encode(passwordResetRequest.getPassword()));
        user.setResetPasswordToken(null);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password has been reset successfully!"));
    }

   /* @GetMapping("/oauth2/success")
    public ResponseEntity<?> oauth2LoginSuccess(@AuthenticationPrincipal OAuth2User oauth2User) {
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        // Vérifier si l'utilisateur existe déjà
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // Créer un nouvel utilisateur si non existant
            user = new User();
            user.setEmail(email);
            user.setUsername(name);
            // Autres champs que vous voudriez enregistrer
            userRepository.save(user);
        }

        // Générer un token JWT pour l'utilisateur
        String jwt = jwtUtils.generateJwtToken(user.getUsername());

        // Rediriger vers le frontend Angular avec le token
        String redirectUrl = "http://localhost:4200/?token=" + jwt;
        return ResponseEntity.status(302).header("Location", redirectUrl).build();
    }
*/

    @GetMapping("/oauth2/failure")
    public ResponseEntity<?> oauth2LoginFailure() {
        return ResponseEntity.badRequest().body("Login via Google a échoué.");
    }

    @GetMapping("/oauth2/success")
    public String oauth2LoginSuccess() {
        String email = "macha@gmail.com";
        String name = "macha";

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {

            user = new User();
            user.setEmail(email);
            user.setUsername(name);
            userRepository.save(user);
        }

        String jwt = jwtUtils.generateJwtToken(user.getUsername());

        return jwt;
    }

}
