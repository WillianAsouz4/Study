

#concdicionais if, elif, else


#exemplo if
idade = int(input("Qual a sua idade?"))

print("Sua idade %s" %idade)
if idade >= 18:
    print("Pode entrar vc e de maior")
elif idade >= 12:
    print("Pode entrar 'e adolecente")
else:
    print("Nao pode entar")

messagem = "pode tirar cnh" if idade >= 18 else "Voce nao pode tirar a cateira de habilitacao"
print(messagem)