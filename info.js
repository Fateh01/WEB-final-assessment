const form = document.getElementById("signUp");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const username = document.getElementById("username");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("passwordCheck");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("step 1");
  checkInputs();
  console.log(firstName.value);
  let data = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    age: age.value,
    email: email.value,
  };
  
  fetch("https://httpbin.org/post", {
    method: "post",
    mode: "cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.form) alert("message sent successfully");
    })
    .catch((err) => console.log(err));
});

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function checkInputs() {
  // trim to remove the whitespaces
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const usernameValue = username.value.trim();
  const ageValue = age.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordCheckValue = passwordCheck.value.trim();
  var alphabets = /^[a-zA-Z ]*$/;
  var numbers = /^[0-9]*$/;
  var space = /[ ]/;

  //first name
  if (firstNameValue === "") {
    setErrorFor(firstName, "First Name cannot be blank");
  } else if (firstNameValue[0].toUpperCase() !== firstNameValue[0]) {
    setErrorFor(firstName, "First letter should be capital");
  } else if (firstNameValue[0] === space) {
    setErrorFor(firstName, "First Name Shouldn't start with a space");
  } else if (!firstNameValue.match(alphabets)) {
    setErrorFor(firstName, "First Name must be all alphabets");
  } else {
    setSuccessFor(firstName);
  }

  //user name
  if (usernameValue === "") {
    setErrorFor(username, "Username cannot be blank");
  } else if (usernameValue.length < 6) {
    setErrorFor(username, "Username must containt at least 6 characters");
  } else if (usernameValue.charAt(0) < "A" || usernameValue.charAt(0) > "z") {
    setErrorFor(username, "Username must start with an alphabet");
  } else {
    setSuccessFor(username);
  }

  //age
  if (ageValue === "") {
    setErrorFor(age, "Age cannot be blank");
  } else if (!ageValue.match(numbers)) {
    setErrorFor(age, "Age must be a number");
  } else if (ageValue < 18 || ageValue > 60) {
    setErrorFor(age, "Age should be between 18 to 60");
  } else {
    setSuccessFor(age);
  }

  //email
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
  } else {
    setSuccessFor(email);
  }

  //password
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "Password must contain at least 6 characters");
  } else if (
    passwordValue.search(/[A-Z]/) < 0 ||
    passwordValue.search(/[a-z]/) < 0 ||
    passwordValue.search(/[0-9]/) < 0
  ) {
    setErrorFor(
      password,
      "Password must have at least 1 digit and 1 uppercase"
    );
  } else {
    setSuccessFor(password);
  }

  //password check
  if (passwordCheckValue === "") {
    setErrorFor(passwordCheck, "Password cannot be blank");
  } else if (passwordValue !== passwordCheckValue) {
    setErrorFor(passwordCheck, "Passwords does not match");
  } else {
    setSuccessFor(passwordCheck);
  }

  //last name
  if (!lastNameValue.match(alphabets)) {
    setErrorFor(lastName, "Last Name must be all alphabets");
  }
  if (lastNameValue[0].toUpperCase() !== lastNameValue[0]) {
    setErrorFor(lastName, "First letter should be capital");
  } else {
    setSuccessFor(lastName);
  }
}
