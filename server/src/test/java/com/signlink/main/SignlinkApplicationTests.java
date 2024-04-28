package com.signlink.main;

import com.signlink.DictionaryMapping.DictionaryMapping;
import com.signlink.DictionaryMapping.DictionaryMappingController;
import com.signlink.DictionaryMapping.DictionaryMappingService;
import com.signlink.UserPackage.UserController;
import com.signlink.UserPackage.UserService;
import com.signlink.UserPackage.Users;
import com.signlink.UserScore.UserScore;
import com.signlink.UserScore.UserScoreController;
import com.signlink.UserScore.UserScoreService;
import com.signlink.WordCoursePackage.Word;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SignlinkApplicationTests {
	@Mock
	@Autowired
	private UserService userService;

	@Autowired
	private UserController userController;

	@Mock
	@Autowired
	private DictionaryMappingService dictionaryMappingService;

	@Autowired
	private DictionaryMappingController dictionaryMappingController;

	@Autowired
	private UserScoreController userScoreController;
	@Mock
	@Autowired
	private UserScoreService userScoreService;

	@Test
	void contextLoads() {
	}
	@Test
	void testValidLogin() {
		// setting up user
		Users u = new Users();
		u.setEmail("test@email.com");
		u.setPassword("password");
		u.setName("name");

		// register user
		userController.registerUser(u);

		// passing it through the login endpoint
		ResponseEntity<String> response = userController.loginUser(u);
		assert response.getStatusCode() == HttpStatusCode.valueOf(200);
		assert !Objects.equals(response.getBody(), "Bad input");
		assert !Objects.equals(response.getBody(), "Invalid credentials");
	}

	@Test
	void noMatchingInputs() {
		// setting up user
		Users u = new Users();
		u.setEmail("email@email");
		u.setPassword("");
		u.setName("");
		u.setID("");


		ResponseEntity<String> response = userController.loginUser(u);
//		System.out.println(response.getStatusCode());
		assert (HttpStatus.BAD_REQUEST == response.getStatusCode());
	}

	@Test
	void testInvalidLogin() {
		// setting up user
		Users u = new Users();
		u.setEmail("invalid-email");
		u.setPassword("");
		u.setName("");

		ResponseEntity<String> response = userController.loginUser(u);
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}

	@Test
	void testValidRegister() {
		// setting up user
		Users u = new Users();
		u.setEmail("test123@email.com");
		u.setPassword("password");
		u.setName("name");

		// register user
		ResponseEntity<String> response = userController.registerUser(u);

		assert response.getStatusCode() == HttpStatusCode.valueOf(200);
		assert !Objects.equals(response.getBody(), "Bad input");
		assert !Objects.equals(response.getBody(), "User already exists or invalid input");
	}

	@Test
	void testInvalidEmailRegister() {
		// setting up user
		Users u = null; // invalid user object

		ResponseEntity<String> response = userController.registerUser(u);
		assert response.getStatusCode() == HttpStatusCode.valueOf(400);
//		assert Objects.equals(response.getBody(), "Bad input");
	}

	@Test
	void testDuplicateEmailReg(){
		Users u = new Users();
		u.setEmail("email@mail.com");
		u.setName("name");
		u.setPassword("password");

		ResponseEntity<String> response1 =  userController.registerUser(u); // registers twice
		ResponseEntity<String> response2 =  userController.registerUser(u); // registers twice

		assert response1.getStatusCode() == HttpStatusCode.valueOf(200); // first is okay
		assert response2.getStatusCode() == HttpStatusCode.valueOf(400); // second is duplicate
	}

	@Test
	void testInvalidEmail() {
		List<String> valid = List.of(
				"email@mail.com",
				"my@mail.co.uk",
				"r.abdulla@mail.com"
		);

		for (String mail : valid) assert userService.validEmail(mail);

	}

	@Test
	void validEmail() {
		List<String> invalid = List.of(
				"email@mail",
				"mymail.co.uk",
				"rabdulla"
		);
		for (String mail : invalid) assert !userService.validEmail(mail);
	}

	@Test
	void testDictionaryQuery() {
		List<DictionaryMapping> response = dictionaryMappingController.getAllMappingsQuery("a");
		assert response!=null;
	}

	@Test
	void testSaveScore() {
		userScoreController.setUserScore("1","1",0.33f);
		int rows = userScoreController.getAllUserScore("1").size();
		assert rows > 0;

	}

	@Test
	void testSaveScoreOverwrite() {
		userScoreController.setUserScore("1","1",0.33f);
		int rowsBefore = userScoreController.getAllUserScore("1").size();
		userScoreController.setUserScore("1","1",0.35f);
		int rowsAfter= userScoreController.getAllUserScore("1").size();
		assert rowsBefore == rowsAfter;

	}
	@Test
	void testGetuserScore() {
		userScoreController.setUserScore("1","1",0.33f);
		userScoreController.setUserScore("1","2",0.72f);
		userScoreController.setUserScore("1","3",0.58f);

		List<UserScore> scores = userScoreController.getAllUserScore("1");
		assert  scores.size() == 3;
	}

}
