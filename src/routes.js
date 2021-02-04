import Login from './pages/Login';
import Inicio from './pages/Inicio';
import RedefSenha from './pages/Redef-senha';
import RecuSenha from './pages/Recu-senha';
import PrimeiroAcesso from './pages/Primeiro-acesso';
import PrimeiraSenha from './pages/Primeira-senha';

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
        path: "/redef_senha/:token",
        name: "RedefSenha",
        component: RedefSenha
    },
    {
        path: "/cadastro_senha/:token",
        name: "PrimeiraSenha",
        component: PrimeiraSenha

    },
    {
        path: "/recupera_senha",
        name: "RecuperaSenha",
        component: RecuSenha
    },
    {
        path: "/primeiro_acesso",
        name: "PrimeiroAcesso",
        component: PrimeiroAcesso
    }
];
export default routes;