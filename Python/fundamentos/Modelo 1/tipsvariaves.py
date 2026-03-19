# Fatiamento de lista
"""
    Estudos sobre fatiamento de lisat
"""

# Declaracao

minha_lista = [1,2,3,4,5, "sexo", True, False]

# Exibição da lista
print(minha_lista)

# Exibição dos elementos da lista
minha_lista[0] = "sexo"
print(minha_lista[4])
print("Pega do item escolhido na lista a o outro Ex [1:7]", minha_lista[1:7])
print("Vai te o intem ecolhido: Ex [:9]", minha_lista[:7])
print("pega do item para a frente [1:]", minha_lista[1:])
print(minha_lista[0])

#metodos lista

# Médoto append(): Adiciona um elemento no final da lista
minha_lista.append("Noite")
print(minha_lista[8])

#medoto index
indices = minha_lista.index(5)
print("Indece do elemento", indices)

#metodo inserte: insere um elemeto em um indice expecifico
minha_lista.insert(2,10)
print(minha_lista)

#metodo pop
elemento_removido = minha_lista.pop(3)
print(minha_lista)

#remove
minha_lista.remove("Noite")
print(minha_lista)
