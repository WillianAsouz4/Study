# controller/menu.py
import os
from datetime import datetime

from .database import inserir_refeicao, buscar_refeicoes_por_dia
from .reports import gerar_relatorio_mensal
from .ui import pedir_alimento, pedir_carboidratos, pedir_data, pedir_mes

def registrar_refeicao(db_path):
    """Registra uma nova refeição no banco de dados."""
    print("\n--- Registrar Nova Refeição ---")
    alimento = pedir_alimento()
    carboidratos = pedir_carboidratos()
    data_hora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        inserir_refeicao(db_path, alimento, carboidratos, data_hora)
        print("\n✅ Refeição registrada com sucesso!")
    except Exception as e:
        print(f"\n❌ Erro ao registrar a refeição: {e}")

def visualizar_consumo_diario(db_path):
    """Exibe todas as refeições de um dia e o total de carboidratos."""
    print("\n--- Visualizar Consumo Diário ---")
    data_str = pedir_data()
    try:
        refeicoes = buscar_refeicoes_por_dia(db_path, data_str)
        if not refeicoes:
            print(f"\nNenhuma refeição encontrada para {data_str}.")
            return
        print(f"\n--- Refeições de {data_str} ---")
        total = 0
        for alimento, carboidratos, hora in refeicoes:
            print(f"{hora} | {alimento} | {carboidratos}g carboidratos")
            total += carboidratos
        print("-----------------------------------------")
        print(f"Total de Carboidratos do dia: {total:.2f}g")
    except Exception as e:
        print(f"\n❌ Erro ao consultar o banco de dados: {e}")

def gerar_relatorio(db_path, reports_dir):
    """Gera e salva um relatório mensal em Excel."""
    print("\n--- Gerar Relatório Mensal ---")
    mes_str = pedir_mes()
    try:
        nome_arquivo, df = gerar_relatorio_mensal(db_path, mes_str, reports_dir)
        if df.empty:
            print(f"\nNenhum registro encontrado para o mês {mes_str}.")
            return
        print(f"\n✅ Relatório salvo em: {nome_arquivo}")
        print(df.to_string(index=False))
    except Exception as e:
        print(f"\n❌ Erro ao gerar o relatório: {e}")

def menu_principal(db_path, reports_dir):
    """Exibe o menu principal e direciona para a função escolhida."""
    if not os.path.exists(db_path):
        print("Arquivo de banco de dados não encontrado.")
        print("Por favor, execute o script 'database_setup.py' primeiro.")
        return

    opcoes_menu = {
        '1': registrar_refeicao,
        '2': visualizar_consumo_diario,
        '3': gerar_relatorio,
    }

    while True:
        print("\n========== CONTADOR DE CARBOIDRATOS ==========")
        print("1. Registrar Refeição")
        print("2. Visualizar Consumo Diário")
        print("3. Gerar Relatório Mensal (Excel)")
        print("4. Sair")
        print("==============================================")
        escolha = input("Escolha uma opção: ").strip()
        if escolha == '4':
            print("Até mais!")
            break
        
        acao = opcoes_menu.get(escolha)
        if acao:
            if escolha == '3':
                acao(db_path, reports_dir)
            else:
                acao(db_path)
        else:
            print("\n❌ Opção inválida. Por favor, tente novamente.")