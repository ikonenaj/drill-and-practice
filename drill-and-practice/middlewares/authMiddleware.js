const restrictedPaths = ["/topics", "/quiz"];

const authMiddleware = async (context, next) => {
    const {state, request, response} = context;
    const user = await state.session.get("user");
    const path = request.url.pathname;
    if (!user && restrictedPaths.some(path => 
        request.url.pathname.startsWith(path))
    ) {
        response.redirect("/auth/login");
    } else {
        context.user = user;
        await next();
    }
  };
  
  export { authMiddleware };