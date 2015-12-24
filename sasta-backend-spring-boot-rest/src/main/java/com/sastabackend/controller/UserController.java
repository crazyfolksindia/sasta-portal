package com.sastabackend.controller;

import com.sastabackend.domain.AboutMe;
import com.sastabackend.domain.ResponseModel;
import com.sastabackend.domain.Session;
import com.sastabackend.service.user.exception.UserAlreadyExistsException;
import com.sastabackend.domain.Users;
import com.sastabackend.service.user.UserService;
import com.wordnik.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Inject
    public UserController(final UserService userService) {
        this.userService = userService;
    }


    @ApiOperation(value = "Create User", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public Users createUser(@ModelAttribute final  Users users) {
        LOGGER.debug("Received request to create the {}", users);
        return userService.save(users);
    }

    @ApiOperation(value = "Create User", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseModel Add(@ModelAttribute final Users users) {
        LOGGER.debug("Received request to create the {}", users);
        return userService.Add(users);
    }

    @ApiOperation(value = "Read Users List", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/getlist", method = RequestMethod.GET)
    public List<Users> listUsers(@RequestParam("id") String  id) {
        LOGGER.debug("Received request to list all users" + System.currentTimeMillis());
        return userService.getList(id);
    }

    @ApiOperation(value = "Sign in", response = ResponseModel.class, httpMethod = "GET")
    @RequestMapping(value = "/signin", method = RequestMethod.GET)
    @ResponseBody
    public ResponseModel signIn(@RequestParam("email") String email,@RequestParam("password") String password){
        return userService.SignIn(email, password);
    }

    @ApiOperation(value = "Upload Avatar Image With Description", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/uploadavatarimages", method = RequestMethod.POST)
    @ResponseBody
    public ResponseModel AddAvatarWithDescription(@RequestBody AboutMe about){
        LOGGER.debug("Received Profile data " + about.toString());
        return userService.UpdateAvatarWithDescription(about.getImage(), about.getDescription(), about.getUserId());
    }

    @ApiOperation(value = "test upload", response = ResponseModel.class, httpMethod = "POST")
    @RequestMapping(value = "/testupload", method = RequestMethod.POST)
    @ResponseBody
    public String testImage(@RequestBody AboutMe about){
        return about.toString();
    }


    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return e.getMessage();
    }

}
