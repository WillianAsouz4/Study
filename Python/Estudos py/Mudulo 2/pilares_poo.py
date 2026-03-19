#Conceitos - Fundamentais
# Abistracao
# Encapisulamento
# Heranca
# polimorfismo


# Exemplo Heranca
print("\nExmplo de Herança: ")
class Animal:
    def __init__(self, nome) -> None:
        self.nome = nome

    def andar(self):
        print(f"O animal {self.nome} andou")
        return

    def emitir_som(self):
        pass

class Cachorro(Animal):
    def emitir_som(self):
        return "Au,au"
    
class Gato(Animal):
    def emitir_som(self):
        return "Miau!"
    

dog = Cachorro(nome="Rex")
cat = Gato(nome="Luna")

print("\nExemplo de polimorfismo")
animais = [dog, cat]

for animal in animais:
    print(f"{animal.nome} faz: {animal.emitir_som()}")

print("\nExemplo de encapsulamento")
class ContaBancaria:
    def __init__(self, saldo) -> None:
        self.__saldo = saldo #Atributo Privado

    def depositar(self, valor):
        if valor > 0:
            self.__saldo += valor

    def sacar(self, valor):
        if valor > 0 and valor <= self.__saldo:
            self.__saldo -= valor
    
    def consultar_saldo(self):
        return self.__saldo

conta = ContaBancaria(saldo=1000)
print(f"Saldo da conta Bancaria: {conta.consultar_saldo()}")
conta.depositar(valor=500)
print(f"Saldo da conta Bancaria: {conta.consultar_saldo()}")
conta.depositar(valor=-500)
print(f"Saldo da conta Bancaria: {conta.consultar_saldo()}")
conta.sacar(valor=200)
print(f"Saldo da conta Bancaria: {conta.consultar_saldo()}")

conta_do_zezinho = ContaBancaria(saldo=50)
print(f"Saldo da Conta do zezinho: {conta_do_zezinho.consultar_saldo()}")

# Abistracao
# vamos cria um molde para cria class dela

print("\nExemplo de absitrcao")
from abc import ABC, abstractmethod
 
class Veiculo(ABC):

    @abstractmethod # Esse é um decorador
    def ligar(self): # Uma calss abistrata nao possui implemetacao ela é so um molde
        pass

    @abstractmethod # Class abistratas nao tem um metodo dentro mas, quando criada uma class derivada é obrigatorio ter as abistrocaoes para ser criada
    def desligar(self):
        pass

class Carro(Veiculo):
    def __init__(self) -> None:
        pass

    def ligar(self):
        return "Ligado"
    
    def desligar(self):
        return "Desligado"


volvo = Carro()
print(volvo.ligar())

# Todos os metodos tem que ser implementa obrigatoria mente