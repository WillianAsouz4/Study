from dotenv import load_dotenv
load_dotenv()  # Carrega as variáveis de ambiente do arquivo .env


from flask import Flask, jsonify, request # Importa o Flask e jsonify para criar a API
import os # Importa o módulo os para manipulação de arquivos e diretórios
from services.image_service import save_image # Importa a função do serviço
from services.openai_service import analyze_meal_image, check_openai_connection, simple_chat_command
from services.insulin_service import calcular_bolus
from dotenv import load_dotenv  # Importa a função para carregar variáveis de ambiente
from extensions import db
from flask_migrate import Migrate
from config import Config
from flask_jwt_extended import JWTManager
from blueprints.auth import auth_bp



app = Flask(__name__)

# Configura o diretório de upload
UPLOAD_FOLDER = 'uploads'  # Diretório onde as imagens serão salvas

# Verifica se o diretório de upload existe, caso contrário, cria
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limite de 16MB para uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}  # Extensões permitidas

app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)
JWTManager(app)
app.register_blueprint(auth_bp, url_prefix='/api/auth')
from models.user import User
from models.meal import Meal
from models.glycemia import GlycemiaRecord


def allowed_file(filename):
    """
    Verifica se o arquivo tem uma extensão permitida.
    Args:
        filename: Nome do arquivo a ser verificado.
    Returns:
        True se a extensão for permitida, False caso contrário.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    """
    Rota inicial do aplicativo Flask que retorna uma mensagem de boas-vindas.
    """
    return jsonify({
        "message": "Bem-vindo ao servidor Flask! Acesse /info para mais detalhes.",
        "endpoints": {
            "GET /": "Mensagem de boas-vindas",
            "GET /info": "Informações sobre o aplicativo",
            "POST /upload_imagem": "Rota para upload de imagens"
        }
    }) 

@app.route('/info')
def info():
    """
    Rota que retorna informações sobre o aplicativo.
    """
    return jsonify({
        "app_name": "GlicoGuide - easy diabetes management",
        "version": "1.0.0",
        "description": "GlicoGuide é um aplicativo para facilitar o gerenciamento de diabetes.",
        "documentation": "https://glicoguide.com.br",
        "author": "GlicoGuide Research and Development Team",
        "contact": "@glicoguide"
    })

@app.route('/check_openai_connection', methods=['GET'])
def check_openai_connection_route():
    """
    Rota para verificar a conexão com a API da OpenAI.
    Retorna um status indicando se a conexão foi bem-sucedida.
    """
    try:
        success, message = check_openai_connection()
        if success:
            return jsonify({"status": message}), 200
        else:
            return jsonify({"error": message}), 500
    except Exception as e:
        return jsonify({"error": f"Erro interno do servidor: {str(e)}"}), 500


@app.route('/upload_imagem', methods=['POST'])
def upload_imagem():
    """
    Rota para receber o upload de uma imagem.
    Espera um arquivo com o nome 'imagem' na requisição.
    """
    # Verifica se a requisição contém a parte do arquivo
    if 'imagem' not in request.files:
        return jsonify({"error": "Nenhum arquivo 'imagem' enviado na requisição."}), 400

    # Obtém o arquivo da requisição
    file = request.files['imagem']

    # Se o usuário não selecionar um arquivo, o navegador envia um arquivo vazio sem nome.
    if file.filename == '':
        return jsonify({"error": "Nenhum arquivo selecionado."}), 400

    # Verifica se o tipo de arquivo é permitido
    if allowed_file(file.filename):
        try:
            # Chama a função do serviço para salvar a imagem
            filename = save_image(file, app.config['UPLOAD_FOLDER'])
            if filename:
                return jsonify({"message": "Imagem enviada e salva com sucesso!", "filename": filename}), 201
            else:
                return jsonify({"error": "Falha ao salvar a imagem."}), 500
        except Exception as e:
            return jsonify({"error": f"Erro interno do servidor: {str(e)}"}), 500
    else:
        return jsonify({"error": "Tipo de arquivo não permitido. Apenas PNG, JPG e JPEG são aceitos."}), 400


@app.route('/analisar_refeicao', methods=['POST'])
def analisar_refeicao():
    """
    Rota para receber uma imagem de refeição, salvá-la e enviá-la para o ChatGPT
    para identificação de componentes.
    """
    if 'imagem' not in request.files:
        return jsonify({"error": "Nenhum arquivo 'imagem' enviado na requisição."}), 400

    file = request.files['imagem']

    if file.filename == '':
        return jsonify({"error": "Nenhum arquivo selecionado."}), 400

    if file and allowed_file(file.filename):
        try:
            image_data = file.read()

            # Chama o serviço da OpenAI sem um prompt_text extra,
            # pois o prompt principal já está no serviço
            analysis_result = analyze_meal_image(image_data)

            if analysis_result:
                # Retorna o resultado JSON diretamente
                return jsonify({"message": "Análise da refeição concluída com sucesso.", "analysis": analysis_result}), 200
            else:
                return jsonify({"error": "Falha ao analisar a imagem com a OpenAI ou resposta inválida."}), 500

        except Exception as e:
            return jsonify({"error": f"Erro interno do servidor: {str(e)}"}), 500
    else:
        return jsonify({"error": "Tipo de arquivo não permitido. Apenas PNG, JPG, JPEG e GIF são aceitos."}), 400

@app.route('/test_chatgpt_command', methods=['GET'])
def test_chatgpt_command():
    """
    Rota para fazer um comando simples no ChatGPT e retornar a resposta.
    Útil para verificar o funcionamento do modelo com prompts de texto.
    """
    try:
        # Você pode passar um prompt customizado via parâmetro de query
        # Ex: /test_chatgpt_command?prompt=Qual a capital da França?
        user_prompt = request.args.get('prompt', 'Qual o seu nome e quem te criou?')

        response_content = simple_chat_command(user_prompt)

        if response_content:
            return jsonify({
                "status": "success",
                "requested_prompt": user_prompt,
                "chatgpt_response": response_content
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Falha ao obter resposta do ChatGPT."
            }), 500
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Erro ao testar comando do ChatGPT: {str(e)}"
        }), 500

@app.route('/calcular_insulina', methods=['POST'])
def calcular_insulina():
    """
    Recebe uma imagem de refeição + parâmetros glicêmicos do paciente,
    analisa os carboidratos via GPT-4o e calcula a dose de insulina bolus.

    Form-data esperado:
        imagem          (arquivo)
        glicemia_atual (float, mg/dL)
        glicemia_alvo (float, mg/dL) — padrão: 100
        ratio_carb (float, g/U) — padrão: 15
        fator_correcao (float, mg/dL por unidade) — padrão: 40
    """
    if 'imagem' not in request.files:
        return jsonify({"error": "Nenhum arquivo 'imagem' enviado na requisição."}), 400

    file = request.files['imagem']

    if file.filename == '':
        return jsonify({"error": "Nenhum arquivo selecionado."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Tipo de arquivo não permitido. Apenas PNG, JPG, JPEG e GIF são aceitos."}), 400

    glicemia_atual = request.form.get('glicemia_atual')
    if not glicemia_atual:
        return jsonify({"error": "Campo 'glicemia_atual' é obrigatório."}), 400

    try:
        glicemia_atual = float(glicemia_atual)
        glicemia_alvo = float(request.form.get('glicemia_alvo', 100))
        ratio_carb = float(request.form.get('ratio_carb', 15))
        fator_correcao = float(request.form.get('fator_correcao', 40))
    except ValueError:
        return jsonify({"error": "Parâmetros numéricos inválidos."}), 400

    try:
        image_data = file.read()
        analysis = analyze_meal_image(image_data)

        if not analysis:
            return jsonify({"error": "Falha ao analisar a imagem com a OpenAI."}), 500

        total_carbs = analysis.get('total_carboidratos_g', 0)
        insulina = calcular_bolus(
            total_carboidratos_g=total_carbs,
            glicemia_atual=glicemia_atual,
            glicemia_alvo=glicemia_alvo,
            ratio_carb=ratio_carb,
            fator_correcao=fator_correcao
        )

        return jsonify({
            "message": "Cálculo realizado com sucesso.",
            "analise_refeicao": analysis,
            "calculo_insulina": insulina
        }), 200

    except Exception as e:
        return jsonify({"error": f"Erro interno do servidor: {str(e)}"}), 500


if __name__ == '__main__':
    # Quando o aplicativo estiver em produção, vamos precisar de um servidor WSGI
    # como Gunicorn ou uWSGI para servir o aplicativo de forma robusta.
    # Para desenvolvimento, o servidor embutido do Flask é suficiente.
    app.run(debug=True, host='0.0.0.0', port=5001)
