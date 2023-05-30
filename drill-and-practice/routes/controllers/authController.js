import { bcrypt } from "../../deps.js";
import { validasaur } from "../../deps.js";
import * as authService from "../../services/authService.js";

const authValidationRules = {
  
}

const showRegistrationPage = ({ render }) => {
    render("auth.eta", { page: "Register" });
};

const showLoginPage = ({ render }) => {
    render("auth.eta", { page: "Login" })
};

const register = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await authService.registerUser(params.get("email"), await bcrypt.hash(params.get("password")));
    response.redirect("/auth/login");
};

const login = async ({ request, response, state }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    
    const userFromDatabase = await authService.findUserByEmail(
        params.get("email"),
      );
      if (userFromDatabase.length != 1) {
        response.redirect("/auth/login");
        return;
      }
    
      const user = userFromDatabase[0];
      const passwordMatches = await bcrypt.compare(
        params.get("password"),
        user.password,
      );
    
      if (!passwordMatches) {
        response.redirect("/auth/login");
        return;
      }
    
      await state.session.set("user", user);
      response.redirect("/topics");
};

export { login, register, showLoginPage, showRegistrationPage };