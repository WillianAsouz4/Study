# pratica numero aliatorio

import random

def jogar ():
    numero = random.randint(1, 100)
    return numero

numero = jogar()

print("Temte adivinha o numero de 1 a 100")

tentativas = 0

while tentativas < 10:
    tentativas += 1
    numeroin = int(input("digite Oo numero:"))
    if numeroin < numero:
        print( f"o numero secreto é maior que: {numeroin}")
    elif numeroin > numero:
           print(f"o numero secreto é menor que: {numeroin}")
    elif numeroin == numero:
        print("acertou")
        break
else:
    print(f"o numero secreto era: {numero}")
