#Aula 35 - Modulos em python

print("Exmplo de inportacao de modulo padrao")

#import math # inporatando todo o modulo math
from math import sqrt # importando apenas a funcao sqrt do modulo math Ops: isso é uma boa pratica para evitar conflitos futuros

raiz_quadrada = sqrt(25)
print(f"A raiz quandada de 25 é: {raiz_quadrada}")
#import math


print("\nExemplo de cria e ultilizacao de um modulo personalizado")
#import meumodelo # importando o modulo personalizado meumodelo
from meumodelo import dobro

#mesagem = meumodelo.saudacao("Wizard")
resultado_dobro = dobro(5)

#print(mesagem)
print(f"O dobro de 5 é: {resultado_dobro}")