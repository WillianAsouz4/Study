# main.py
import os
from controller.menu import menu_principal

# Define os caminhos a partir da raiz do projeto para garantir que sempre funcionem
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(PROJECT_ROOT, 'data', 'carboidratos.db')
REPORTS_DIR = os.path.join(PROJECT_ROOT, 'reports')

if __name__ == "__main__":
    # Passa os caminhos para a função principal do menu
    menu_principal(db_path=DB_PATH, reports_dir=REPORTS_DIR)