import Login from './pages/Login';
import Inicio from './pages/Inicio';
import RedefSenha from './pages/Redef-senha';

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
        path: "/redef_senha",
        name: "RedefSenha",
        component: RedefSenha
    }
];
export default routes;