const router = require('express').Router();
const Person = require('../models/Person');


//Create - Criação de dados no banco
router.post('/', async (req, res) => {

  // req.body
  const {name, salary, approved} = req.body;

  //se usuário for criado sem nome no body
  if(!name){
    res.status(422).json({error: "O nome é obrigatório!"})
    return
  }

  const person = {
    name,
    salary,
    approved
  }

  //utilizando método create do mongoose
  try {
    //criando dados no banco
    await Person.create(person);

    res.status(201).json({message: "Pessoa inserida no sistema com sucesso!"});
    
  } catch (error) {
    res.status(500).json({error: error});
  }

})


//Read - Leitura de dados
router.get('/', async (req, res) => {

  try {

    //people = plural de person = nome da collection atribuida no MongoDB
    //obs: nao interfere em nada no nome da variável abaixo
    //Método find() garante que todos os dados sejam retornados

    const people = await Person.find();

    res.status(200).json(people);
    
  } catch (error) {
    res.status(500).json({error: error});
  }

})

//filtrando pessoas por registro unico
router.get('/:id', async (req, res) => {

  //extrair o dado da requisição, pela url = req.params
  const id = req.params.id;

  try {

    //Método findOne() acha somente 1 registro, ideal para procuras com id unico
    const person = await Person.findOne({ _id: id });

    if(!person){
      res.status(422).json({error: "Usuário não encontrado."})
      return
    }

    res.status(200).json(person);
    
  } catch (error) {
    res.status(500).json({error: error});
  }

})


//Update - atualização de dados (PUT, PATCH)
//PUT atualiza todo o body do resultado
//Atualiza parcialmente o body do resultado, por exemplo, atualzia apenas o nome

router.patch('/:id', async (req, res) => {

  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved
  }
  
  try {

    const updatedPerson = await Person.updateOne({_id: id}, person);


    //matchedCount conta quantos registros foram atualizados
    if(updatedPerson.matchedCount === 0){
      res.status(422).json({error: "Usuário não encontrado."})
      return
    }

    res.status(200).json(person);
    
  } catch (error) {
    res.status(500).json({error: error});
  }

})


//Delete - Deletar dados do banco
router.delete('/:id', async (req, res)=> {

  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

    if(!person){
      res.status(422).json({error: "Usuário não encontrado."})
      return
    }

    try {

      await Person.deleteOne({_id:id});

      res.status(200).json({message: "Usuário removido com sucesso!"});
      
    } catch (error) {
      res.status(500).json({error: error});
    }

})

module.exports = router