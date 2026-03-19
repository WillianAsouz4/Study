import sqlite3
import os

def conectar(db_path):
    return sqlite3.connect(db_path)

def inserir_refeicao(db_path, alimento, carboidratos, data_hora):
    with conectar(db_path) as conn:
        cursor = conn.cursor()
        query = "INSERT INTO refeicoes (alimento, carboidratos, data_hora) VALUES (?, ?, ?)"
        cursor.execute(query, (alimento, carboidratos, data_hora))
        conn.commit()

def buscar_refeicoes_por_dia(db_path, data_str):
    with conectar(db_path) as conn:
        query = "SELECT alimento, carboidratos, strftime('%H:%M:%S', data_hora) as hora FROM refeicoes WHERE date(data_hora) = ?"
        cursor = conn.cursor()
        cursor.execute(query, (data_str,))
        return cursor.fetchall()