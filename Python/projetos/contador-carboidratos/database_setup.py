import sqlite3
import os

# Define o caminho absoluto para a raiz do projeto
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
# Define o nome da pasta e do arquivo do banco de dados
DB_FILE = os.path.join(PROJECT_ROOT, 'data', 'carboidratos.db')

def create_database(db_path=DB_FILE):
    """
    Cria o banco de dados e a tabela 'refeicoes' se eles não existirem.
    """
    # Garante que a pasta 'data' exista
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    conn = None
    try:
        # Conecta ao banco de dados (cria o arquivo se não existir)
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        print("Conectado ao banco de dados.")

        # Comando SQL para criar a tabela
        create_table_query = """
        CREATE TABLE IF NOT EXISTS refeicoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            alimento TEXT NOT NULL,
            carboidratos REAL NOT NULL,
            data_hora TEXT NOT NULL
        );
        """

        # Executa o comando SQL
        cursor.execute(create_table_query)
        print("Tabela 'refeicoes' verificada/criada com sucesso.")

        # Salva as alterações no banco de dados
        conn.commit()

    except sqlite3.Error as e:
        print(f"Ocorreu um erro ao criar o banco de dados: {e}")
    finally:
        if conn:
            conn.close()
            print("Conexão com o banco de dados fechada.")

if __name__ == "__main__":
    create_database()