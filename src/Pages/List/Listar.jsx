import { useEffect, useState,useContext } from 'react'
import './Style.css'
import Forms from '../../components/Forms'
import Table from '../../components/Table'
import { UserContext } from "../../Context/Provider"


function Listar() {

  const {apiUrl } = useContext(UserContext)

  const produto = {
    codigo : 0,
    nome : '',
    marca: ''
  }

  //UseStats
  const[btnCadastrar,setBtnCadastrar] = useState(true)
  const[produtos,setProdutos] = useState([])
  const[objProduto,setObjProduto] = useState(produto)

  //UseEffect
  useEffect(()=>{
    fetch(`${apiUrl}/listar`)
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))
  },[])

  //Obtendo os dados do formulario
  const aoDigitar =(e)=>{
    setObjProduto({...objProduto,[e.target.name]:e.target.value})
  }

  //Cadatrar Produto
  const cadastrar = () =>{
    fetch(`${apiUrl}/cadastrar`,{
      method:"post",
      body:JSON.stringify(objProduto),
      headers:{
        "Content-type":'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }else{
        setProdutos([...produtos,retorno_convertido])
        alert("Produto Cadastrado com sucesso!")
        limparFormulario()
      }
    })
  }
  
  //Remover Produto
  const remover = () =>{
    fetch(`${apiUrl}/remover/` + objProduto.codigo,{
      method:"delete",
      headers:{
        "Content-type":'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      
        // Mesangem
        alert(retorno_convertido.mensagem)
        //Copia do vetor de produtos
        let vetorTemp =[...produtos]

        //Indice
        let indice = vetorTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo
        })

        //Remover produto do vetor temp
        vetorTemp.splice(indice, 1)

        //Atualizar o veto de produtos
        setProdutos(vetorTemp)

        //Limpar formulario
        limparFormulario()
    })
  }

  //Limpar formulario
  const limparFormulario = ()=>{
    setObjProduto(produto)
    setBtnCadastrar(true)
  }

  //Selecionar produto
  const selecionarProduto = (indice) =>{
    setObjProduto(produtos[indice])
    setBtnCadastrar(false)
  }

  //Alterar Produto
  const alterar = () =>{
    fetch(`${apiUrl}/alterar`,{
      method:"put",
      body:JSON.stringify(objProduto),
      headers:{
        "Content-type":'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido =>{
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem)
      }else{
        alert("Produto alterado com sucesso!")

        //Copia do vetor de produtos
        let vetorTemp =[...produtos]

        //Indice
        let indice = vetorTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo
        })

        //Alterar produto do vetor temp
        vetorTemp[indice] =objProduto

        //Atualizar o veto de produtos
        setProdutos(vetorTemp)

        limparFormulario()
      }
    })
  }


  return (
    <>
     <div> 
      
      <Forms botao={btnCadastrar} eventoTeclado={aoDigitar} cancelar={limparFormulario} cadastrar={cadastrar} obj={objProduto} remover={remover} alterar={alterar}/>
      <Table vetor={produtos} selecionar={selecionarProduto}/>
     </div>
    </>
  )
}

export default Listar



