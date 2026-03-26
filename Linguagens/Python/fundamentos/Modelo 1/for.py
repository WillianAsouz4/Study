lista = [1, 2,3,4,5]
print("Ultilizando list")
for elemento in lista:
    print(elemento)
#cada vez que o for executar ele vai executar o bloco ate o final da lista

print("for tupla")
tupla = (1, 2, 3, 4, 5)
for tuplae in tupla:
    print(tuplae)

# Usado pra ler a chave do dicionario no for
pessoa = {"nome" : "Willian", "Idade" : 20, "Cidade" : "Anapolis"}
for chaves in pessoa.keys():
    print(chaves)
# Usado para imprimir o valor do dicionario
for valores in pessoa.values():
    print(valores)

for chave, valor in pessoa.items():
    print(f"{chave}: {valor}")

x = range(100)
for n in x:
    print(n)




lista = [1, 2, 3, 4, 5]
#range(): Retorna um intervalo numerico
#for gera o indice de cada valor da lista, o range() gerada o valor do indice,
# e o len ele percore a lista e verifica ate aonde lea vai
for indice in range(0, len(lista)):
#if ele ferifca se o valor do indice é 3
    if indice == 3:
        #se o valor do indice for 3 ele vai mudar o valor do INDICE para 5
        lista[indice] = 5
    #se o valor do indce for direfete de 3 ele vai mudar o valor do INDICE para 0
    else:
        lista[indice] = 0
print(lista)

l_enumerate = ["a","b", "c"]
for indice, valor in enumerate(l_enumerate):
    print(f"{indice}: {valor}")