import { Produto } from "app/models/produtos"
import { Layout } from "components"
import Link from 'next/link'
import { TabelaProdutos } from "./tabela"

export const ListagemProdutos: React.FC = () => {

  const produtos: Produto[] = [{
    id: "1", sku: 'ABDJG45', nome: "Impressora", preco: 250.00
  }]
  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <TabelaProdutos produtos={produtos}/>
    </Layout>
  )
}