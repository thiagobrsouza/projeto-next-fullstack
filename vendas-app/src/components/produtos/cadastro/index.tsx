import { useState } from 'react';
import { Layout } from "components";

export const CadastroProdutos: React.FC = () => {

  const [sku, setSku] = useState('')
  const [preco, setPreco] = useState('')
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  const submit = () => {
    const produto = { sku, preco, nome, descricao };
    console.log(produto);
  }

  return (
    <Layout titulo="Cadastro de Produtos">
      <div className="columns">
        <div className="field is-half column">
          <label className="label" htmlFor="sku">SKU: *</label>
          <div className="control">
            <input type="text" className="input" placeholder="Digite o SKU do produto" id="sku"
            value={sku} onChange={event => setSku(event.target.value)}/>
          </div>
        </div>

        <div className="field is-half column">
          <label className="label" htmlFor="preco">Preço: *</label>
          <div className="control">
            <input type="text" className="input" placeholder="Digite o preço do produto" id="preco"
            value={preco} onChange={event => setPreco(event.target.value)}/>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="nome">Nome: *</label>
          <div className="control">
            <input type="text" className="input" placeholder="Digite o nome do produto" id="nome"
            value={nome} onChange={event => setNome(event.target.value)}/>
          </div>
        </div>
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