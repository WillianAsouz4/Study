#dicionario
pessoa = {"nome": "Willian", "Idade": 20, "Cidade": "Anapolis"}

print("Essa é uma lista de dicionario:",pessoa)

print("Chmando o nome da pessoa:", pessoa["nome"])
print("Chmando a idade da pessoa:", pessoa["Idade"])
print("Chmando a cidade da pessoa:", pessoa["Cidade"])

# Adicionado um novo Item no dicionario 

pessoa["profissao"] = "Programador"
pessoa["Genero"] = "Maculino"

print("Adicionando um novo item no dicionario:", pessoa["profissao"])

# Modificando um Item do dicionario
pessoa["profissao"] = "Software Developer"
print("Modificando um item do dicionario:", pessoa["profissao"])

# Romovendo um Item do dicionario
del pessoa["Genero"]
print("Removendo um item do dicionario:", pessoa)

#metodos keys
chaves = list(pessoa.keys())
print(chaves)

#values
valores = list(pessoa.values())
print("Valores do dicionário:", valores)


 # Intem 
intems = list(pessoa.items())
print("Itens do dicionário:", intems)
print("valor da chaves %s = %s" % (intems[2][0], intems[2][1]))


