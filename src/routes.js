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
        isAuth: true,
        component: Inicio
    },
    {
        path: "/teste",
        name: "Teste",
        component: Teste
    }
];
export default routes;