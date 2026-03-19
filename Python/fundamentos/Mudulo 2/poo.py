# POO
#   é uma paradigma da programacao que tem como objetivo organizar o código em objetos,
#  onde cada objeto é uma instância de uma classe. A classe é um molde para criar objetos
#  onde podemos definir atributos e métodos.

class Pessoa:
    def __init__(self, nome, idade) -> None: # esse é um metodo construtor
        self.nome = nome
        self.idade = idade

    def saudacao(self):
        return f"Olá, meu nome é {self.nome}, e a minha idade é {self.idade}"

# Obijeto é uma instancia de uma classe, ou seja, é um exemplar da classe. A classe é um molde para criar objetos, onde podemos definir atributos e métodos.
pessoa = Pessoa("willian", 19)
messagem = pessoa.saudacao()
print(messagem)
