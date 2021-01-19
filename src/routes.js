import Login from './pages/Login';
import Inicio from './pages/Inicio';

var routes = [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/inicio",
        name: "Inicio",
        component: Inicio,
        notPath: "/login"
    }
];
export default routes;