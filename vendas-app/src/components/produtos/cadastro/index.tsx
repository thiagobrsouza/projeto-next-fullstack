import { useState } from 'react';
import { Layout, Input } from "components";
import { useProdutoService } from 'app/services';
import { Produto } from 'app/models/produtos';

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [id, setId] = useState<string | undefined>('')
  const [dataCadastro, setDataCadastro] = useState<string | undefined>('')

  const submit = () => {
    const produto: Produto = {
      id, sku, preco: parseFloat(preco), nome, descricao, dataCadastro
    };
    service.salvar(produto).then(produtoResposta => {
      setId(produtoResposta.id)
      setDataCadastro(produtoResposta.dataCadastro)
    });
  }

  return (
    <Layout titulo="Cadastro de Produtos">
    {id &&
      <div className="columns">
          <Input label="Código:" columnClasses="is-half" value={id} id="id" disabled/>  
          <Input label="Data cadastro:" columnClasses="is-half" value={dataCadastro} id="dataCadastro" disabled/>
      </div>
    }

      <div className="columns">
        <Input label="SKU: *" columnClasses="is-half" onChange={setSku} value={sku} id="sku"
          placeholder="Digite o SKU do produto"/>
        
        <Input label="Preço: *" columnClasses="is-half" onChange={setPreco} value={preco} id="preco"
          placeholder="Digite o preço do produto"/>
      </div>

      <div className="columns">
        <Input label="Nome: *" columnClasses="is-full" onChange={setNome} value={nome} id="nome"
          placeholder="Digite o nome do produto"/>
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="descricao">Descrição:</label>
          <div className="control">
            <textarea className="textarea" placeholder="Digite a descrição do produto" id="descricao"
            value={descricao} onChange={event => setDescricao(event.target.value)}/>
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={submit}>Salvar</button>
        </div>
        <div className="control">
          <button className="button">Voltar</button>
        </div>
      </div>
      

    </Layout>
  )
}