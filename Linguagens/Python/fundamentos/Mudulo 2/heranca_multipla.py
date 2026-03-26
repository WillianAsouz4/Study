#Heranca multipla

class Animal:
    def __init__(self, nome) -> None:
        self.nome = nome

    def emitir_som(self):
        pass


class Mamifero(Animal):
    def amamentar(self):
        return f"{self.nome} esta amamentando."
    
class Ave(Animal):
    def voar(self):
        return f"{self.nome} esta voando."
    
class Morcego(Mamifero, Ave):
    def emitir_som(self):
        return f"O morcego esta emitindo o som"
    
morcego = Morcego(nome="Batman")

#Acessando método de class base `Animal`
print("nome:", morcego.nome)
print("som:", morcego.emitir_som())

#Acessando metodos da clesse mamifero e ave
print("morcego amamentando:", morcego.amamentar())
print("voar:", morcego.voar())