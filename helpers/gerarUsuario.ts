import gerarNome from "./gerarNome"
import gerarNumeroDeCartao from "./gerarCartao"

interface IUsuario {
    nome : string,
    cartao : string
}

export default function gerarUsuario() : IUsuario{

    const nome = gerarNome()
    const numeroCartao = gerarNumeroDeCartao()


    return {
        nome : nome,
        cartao : numeroCartao
    }
}

function gerarUsuarios(quantidade : number):object{

    let usuariosGerados = []
    for(let i = 0; i < quantidade; i++){
        usuariosGerados.push(gerarUsuario())
    }
    return usuariosGerados
}
