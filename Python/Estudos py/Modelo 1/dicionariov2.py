#dicionario de exmplo
pessoa = {"nome": "Jaão", "idade": 30, "cidade": "São Paulo"}

print(pessoa)

print(pessoa["nome"])
print(pessoa["idade"])
print(pessoa["cidade"])

pessoa["sexo"] = "Masculino"
print("sexo:", pessoa["sexo"])

pessoa["idade"] = 20
print("idade:", pessoa["idade"])

# Remover um par cahve
del pessoa["cidade"]

print(pessoa)

# metodos keys(), values(), items()
chaves = list(pessoa.keys())
print(chaves)
print("Primeira chave", chaves[0])