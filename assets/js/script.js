
let char = new Mago('Gordon') //criando o Personagem
let monster = new BigMonster() //criando o Monster
let log = new Log(document.querySelector('.log'))



const cenario = new Cenario(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)

cenario.start()