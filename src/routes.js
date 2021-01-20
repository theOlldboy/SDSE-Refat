import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Teste from './pages/Teste';

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
    },
    {
        path: "/teste",
        name: "Teste",
        component: Teste
    }
];
export default routes;