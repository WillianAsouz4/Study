import os # Importa o módulo os para manipulação de arquivos e diretórios
from werkzeug.utils import secure_filename # Para sanitizar nomes de arquivo

def save_image(file, upload_folder):
    """
    Salva o arquivo de imagem no diretório especificado.
    Args:
        file: O objeto de arquivo recebido do Flask (request.files['nome_do_campo']).
        upload_folder: O caminho para o diretório onde as imagens serão salvas.
    Returns:
        O nome do arquivo salvo se o upload for bem-sucedido, caso contrário None.
    """
    try:
        # Garante um nome de arquivo seguro para evitar ataques de caminho na requisição
        filename = secure_filename(file.filename)
        file_path = os.path.join(upload_folder, filename)
        # Verifica se o diretório de upload existe, caso contrário, cria
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
            
        # Salva o arquivo no diretório especificado
        file.save(file_path)
        # Retorna o caminho do arquivo salvo
        print (f"Imagem salva com sucesso: {file_path}")
        return filename
    except Exception as e:
        print(f"Erro ao salvar a imagem: {e}")
        return None