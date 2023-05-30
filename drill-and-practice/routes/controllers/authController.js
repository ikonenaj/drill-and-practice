import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";
import * as authService from "../../services/authService.js";

const authValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)]
};

const showRegistrationPage = ({ errors, render }) => {
    const data = {
      errors: errors,
      page: "Register"
    };
    render("auth.eta", data);
};

const showLoginPage = ({ errors, render }) => {
  const data = {
    errors: errors,
    page: "Login"
  };
  render("auth.eta", data);
};

const register = async ({ render, request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const email = params.get("email");
    const password = params.get("password");
    
    const [passes, errors] = await validasaur.validate(
      { email, password },
      authValidationRules
    );

    if (passes) {
      await authService.registerUser(email, await bcrypt.hash(password));
      response.redirect("/auth/login");
    } else {
      errors.emailValue = email;
      console.log(errors);
      showRegistrationPage({ errors, render });
    }
};

const login = async ({ render, request, response, state }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const email = params.get("email");
    const password = params.get("password");

    const [passes, errors] = await validasaur.validate(
      { email, password },
      authValidationRules
    );
    
    const userFromDatabase = await authService.findUserByEmail(email);
      if (userFromDatabase.length != 1) {
        errors.email = { email: "Incorrect email" };
        errors.emailValue = '';
        showLoginPage({ errors, render });
        return;
      }
    
      const user = userFromDatabase[0];
      const passwordMatches = await bcrypt.compare(
        params.get("password"),
        user.password,
      );
    
      if (!passwordMatches) {
        errors.password = { password: "Incorrect password" };
        errors.emailValue = email;
        showLoginPage({ errors, render });
        return;
      }
    
      await state.session.set("user", user);
      response.redirect("/topics");
};

export { login, register, showLoginPage, showRegistrationPage };