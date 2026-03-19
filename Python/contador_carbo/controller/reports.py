import os
import pandas as pd
from .database import conectar
from datetime import datetime

def gerar_relatorio_mensal(db_path, mes_str, reports_dir):
    with conectar(db_path) as conn:
        query = """
            SELECT 
                alimento AS Alimento,
                carboidratos AS Carboidratos,
                date(data_hora) AS Dia
            FROM refeicoes
            WHERE strftime('%Y-%m', data_hora) = ?
            ORDER BY data_hora
        """
        df = pd.read_sql_query(query, conn, params=(mes_str,))

    if not os.path.exists(reports_dir):
        os.makedirs(reports_dir)

    total = df['Carboidratos'].sum() if not df.empty else 0

    # Adiciona uma linha de total ao final do DataFrame
    if not df.empty:
        total_row = pd.DataFrame([{
            'Alimento': 'TOTAL',
            'Carboidratos': total,
            'Dia': ''
        }])
        df = pd.concat([df, total_row], ignore_index=True)

    nome_arquivo = os.path.join(reports_dir, f'relatorio_{mes_str}.xlsx')
    df.to_excel(nome_arquivo, index=False, engine='openpyxl')
    return nome_arquivo, df