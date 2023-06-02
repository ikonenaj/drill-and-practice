import { Application, Session } from "./deps.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { oakCors } from "./deps.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";


const app = new Application();
app.use(Session.initMiddleware());
app.use(oakCors());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(router.routes());

export { app };
