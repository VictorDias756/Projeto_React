import 'bootstrap/dist/css/bootstrap.min.css';
import avatarNaoLogado from './imagens/avatarNL.png';
import Sistema from './Sistema';
import TelaLogin from './interfaces/TelaLogin';
import TelaCadastroFornecedor from './interfaces/TelaCadastroFornecedor';
import TelaCadastroProduto from './interfaces/TelaCadastroProduto';
import TelaMenu from './interfaces/MenuSistema';
import TelaCadastroCliente from './interfaces/TelaCadastroCliente';
import { Route } from 'react-router-dom';
import ContextoUsuario from './contextos/ContextoGlobal';
import { useState } from 'react';
import TelaLoja from './interfaces/TelaLoja';
import TelaVenda from './interfaces/TelaVenda';

function App() {

  const [usuario, setUsuario] = useState({
    nome: "",
    avatar: avatarNaoLogado,
    logado: false
  });

  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={[usuario, setUsuario]}>
        <Sistema>
          <Route path='*' element={<TelaLogin />} />
        </Sistema>
      </ContextoUsuario.Provider>

    );
  }
  else{
    return (
      <ContextoUsuario.Provider value={[usuario, setUsuario]}>
        <Sistema>
          <Route path='/login' element={<TelaLogin />} />
          <Route path='/cadCliente' element={<TelaCadastroCliente />} />
          <Route path='/cadFornecedor' element={<TelaCadastroFornecedor />} />
          <Route path='/cadProduto' element={<TelaCadastroProduto />} />
          <Route path='/Venda' element={<TelaVenda />} />
          <Route path='/Loja' element={<TelaLoja/>} />
          <Route path='*' element={<TelaMenu />} />
        </Sistema>
      </ContextoUsuario.Provider>
    );
  }
}

export default App;