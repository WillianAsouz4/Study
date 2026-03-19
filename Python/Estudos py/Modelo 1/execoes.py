#aula 34
# Sao eventos que ocorrem duranate a execucao do codigo que podem interromper o fluxo normal do programa.

#tratativa generica de execao
print("Exemoplo de tratativa generica de execao")
while True:
    try:
        numero = int(input("Digite um numero inteiro:"))
        resultado = 10 / numero
        print(f"O resultado é: {resultado}")
    except ValueError as e:
        print(f"Erro de Value Erro: {e}")
        raise ValueError("Tipos de variaveis incompativeis")
    except Exception as e:
        print(f"Erro: {e}")
    else:
        print(f"O resultado é: {resultado}")
    finally:
        print("Operecao Finalizada")
