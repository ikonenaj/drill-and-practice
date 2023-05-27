const authMiddleware = async (context, next) => {
    const {state, request, response} = context;
    const user = await state.session.get("user");
    const path = request.url.pathname;
    if (!user && (path.startsWith("/topic") || path.startsWith("/quiz"))) {
        response.redirect("/auth/register");
    } else {
        context.user = user;
        await next();
    }
  };
  
  export { authMiddleware };