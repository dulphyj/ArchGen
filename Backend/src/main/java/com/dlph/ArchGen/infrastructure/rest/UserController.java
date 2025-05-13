package com.dlph.ArchGen.infrastructure.rest;

import com.dlph.ArchGen.application.UserService;
import com.dlph.ArchGen.domain.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping
    public ResponseEntity<User> save(@RequestBody User user){
        return ResponseEntity.ok(userService.save(user));
    }

    @GetMapping
    public ResponseEntity<User> findByClerkId(@RequestParam String clerkId){
        return userService.findByClerkId(clerkId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUserByClerkId(@RequestParam String clerkId){
        userService.deleteUserByClerkId(clerkId);
        return ResponseEntity.noContent().build();
    }
}
