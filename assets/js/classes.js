//Teremos dois tipos de personagem: Guerreiro ou Mago
//Dois tipos de monstros também: Monstro pequeno e Monstro grande


class Personagem{ //personagem padrão
    _vida = 1   // não colocar zero, pois zero é quando o personagem morre. Para isso usaremos o getter and setter
    vidaMaxima = 1
    ataque = 0
    defesa = 0

    constructor(nome){
        this.nome = nome
    }

    get vida(){
        return this._vida  //para não deixar que a vida fique menor que zero.
    }

    set vida(novaVida){
        this._vida = novaVida < 0 ? 0 : novaVida //fazemos uma verificação, se a vida for menor que zero, será zero, se for maior, usa a novaVida.
    }
}

class Guerreiro extends Personagem{ //vamos usar o extends para utilizar as propriedades do Personagem.
    constructor(nome){
        super(nome) //vamos repassar o nome para o constructor do Personagem. Ele vai acessar o constructor do que estamos estendendo.
        //agora vamos colocar as propriedades próprias desse personagem.
        this.vida = 100    
        this.ataque = 10
        this.defesa = 8
        this.vidaMaxima = this.vida

    }
}

//criaremos agora o mago
class Mago extends Personagem{
    constructor(nome){
        super(nome)
        this.vida = 80
        this.ataque = 15
        this.defesa = 4
        this.vidaMaxima = this.vida
    }
}

class Monster extends Personagem{
    constructor(){ //não passamos a propriedade nome por ele já ter um nome fixo
        super('Monster') //passamos o nome dele dentro do super, como o constructor do Personagem tem apenas a propriedade nome nela, ele já reconhece essa propriedade, o que colocarmos dentro dele, será o valor dessa propriedade nome.
        this.vida =  40
        this.ataque = 5
        this.defesa = 6
        this.vidaMaxima = this.vida
    }
}

class BigMonster extends Personagem{
    constructor(){
        super('Big Monster')
        this.vida = 120
        this.ataque = 16
        this.defesa = 8
        this.vidaMaxima = this.vida
    }
    
}

/*Faremos as classes do cenário. Precisamos saber as informações de quem está lutando, lutador 1 e lutador 2, qual o elemento div que tem as informações do lutador 1 (div id='char') e do lutador 2 (div id='monster')*/ 

class Cenario{
    constructor(lutador1,lutador2,lutador1El,lutador2El,log){
        this.lutador1 = lutador1
        this.lutador2 = lutador2
        this.lutador1El = lutador1El
        this.lutador2El = lutador2El
        this.log = log
    }

    start(){
        this.update()  //vai atualizar a tela
        //evento do botão de atacar
        this.lutador1El.querySelector('.attack').addEventListener('click', ()=> this.doAttack(this.lutador1, this.lutador2))
        this.lutador2El.querySelector('.attack').addEventListener('click', ()=> this.doAttack(this.lutador2, this.lutador1))
    }

    update(){
        //lutador 1
        this.lutador1El.querySelector('.name').innerHTML = `${this.lutador1.nome} - ${this.lutador1.vida.toFixed(2)}HP`
        //barra de vida - devemos calcular a porcentagem baseada na vida atual x vida máxima 
        let l1Porc = (this.lutador1.vida / this.lutador1.vidaMaxima) * 100
        this.lutador1El.querySelector('.bar').style.width = `${l1Porc}%`

        //lutador 2
        this.lutador2El.querySelector('.name').innerHTML = `${this.lutador2.nome} - ${this.lutador2.vida.toFixed(2)}HP`
        let l2Porc = (this.lutador2.vida / this.lutador2.vidaMaxima) * 100
        this.lutador2El.querySelector('.bar').style.width = `${l2Porc}%`
    }

    doAttack(attacking, attacked){
        if(attacking.vida <=0 || attacked.vida <=0){
            this.log.addMessage('Ta morto!')
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2)
        let defenseFactor = (Math.random() * 2).toFixed(2)

        let actualAttack = attacking.ataque * attackFactor
        let actualDefense = attacked.defesa * defenseFactor

        if(actualAttack > actualDefense){
            attacked.vida -= actualAttack.toFixed(2)
            this.log.addMessage(`${attacking.nome} deu ${actualAttack.toFixed(2)} de dano em ${attacked.nome}`)
        } else {
            this.log.addMessage(`${attacked.nome} conseguiu defender o ataque de ${attacking.nome}`)
        }


        this.update() //para atualizar a barra de vida dos lutadores.
    }
}

class Log{
    list = [] //vamos criar um array para armazenar as mensagens de log
    constructor(listEl){
        this.listEl = listEl
    }

    addMessage(msg){
        this.list.push(msg) //adicionando a mensagem no array com o push
        this.render()
    }

    render(){ //renderizar, transformar o que está na lista em visual.
        this.listEl.innerHTML = '' //limpar a lista

        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }

        
    }
}