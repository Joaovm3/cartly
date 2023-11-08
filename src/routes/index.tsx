import { AppStackRoutes } from "./app.stack.routes";
import { AuthRoutes } from "./auth.routes";

const isUserAuthenticated = false;

export function Routes() {
  return isUserAuthenticated ? <AppStackRoutes /> : <AuthRoutes />;
}
