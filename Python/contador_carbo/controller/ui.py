from datetime import datetime
import os

def pedir_alimento():
    return input("Nome do alimento: ")

def pedir_carboidratos():
    while True:
        try:
            valor = input("Quantidade de carboidratos (em gramas): ").replace(',', '.')
            return float(valor)
        except ValueError:
            print("Valor inválido. Por favor, digite apenas números.")

def pedir_data():
    return input("Digite a data (formato AAAA-MM-DD): ")

def pedir_mes():
    while True:
        mes = input("Digite o mês e ano para o relatório (formato AAAA-MM): ")
        if len(mes) == 7 and mes[4] == '-':
            return mes
        print("Formato inválido. Use AAAA-MM, exemplo: 2024-07")