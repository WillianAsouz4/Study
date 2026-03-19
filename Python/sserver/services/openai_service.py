import base64 # services/openai_service.py
import os # Importa o módulo os para manipulação de arquivos e diretórios
from openai import OpenAI, AuthenticationError, APIConnectionError, RateLimitError
from openai.types.shared_params import ResponseFormatJSONObject
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam
import json # Importa o módulo json
from dotenv import load_dotenv  # Importa a função para carregar variáveis de ambiente

load_dotenv()

def get_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY não encontrada nas variáveis de ambiente.")
    return OpenAI(api_key=api_key)

def encode_image_to_base64(image_data):
    """
    Codifica os dados binários de uma imagem para uma string Base64.
    """
    return base64.b64encode(image_data).decode('utf-8')

def check_openai_connection():
    """
    Tenta fazer uma chamada simples à API da OpenAI para verificar a conectividade.
    Retorna uma tupla (bool, str) indicando sucesso/erro e uma mensagem.
    """
    try:
        client = get_client()
        messages: list[ChatCompletionUserMessageParam] = [
            {"role": "user", "content": "Hello!"}
        ]
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=5
        )
        if response.choices:
            return True, "Conexão com OpenAI estabelecida com sucesso!"
        return False, "Erro inesperado ao verificar a conexão com OpenAI."

    except AuthenticationError:
        return False, "Erro de autenticação: Verifique sua chave API da OpenAI."
    except APIConnectionError:
        return False, "Erro de conexão: Não foi possível conectar aos servidores da OpenAI. Verifique sua rede."
    except RateLimitError:
        return False, "Erro de limite de taxa: Sua cota de requisições OpenAI pode ter sido excedido."
    except Exception as e:
        return False, f"Erro inesperado ao verificar a conexão com OpenAI: {str(e)}"


def analyze_meal_image(image_data, prompt_text=None): # prompt_text agora é opcional
    """
    Envia uma imagem e um prompt para a API do OpenAI (GPT-4o ou similar)
    para identificar componentes de refeição, solicitando uma resposta JSON padronizada.

    Args:
        image_data: Os dados binários da imagem.
        prompt_text: Prompt textual adicional (opcional).

    Returns:
        Um dicionário Python (parsed do JSON) contendo a análise, ou None em caso de erro.
    """
    raw_content: str = ""
    try:
        client = get_client()
        base64_image = encode_image_to_base64(image_data)

        # Detecta o tipo MIME real da imagem pelos magic bytes
        if image_data[:8] == b'\x89PNG\r\n\x1a\n':
            mime_type = "image/png"
        else:
            mime_type = "image/jpeg"

        # Prompt detalhado para garantir um formato de saída JSON fixo com carboidratos
        system_prompt = (
            "Você é um assistente especializado em nutrição e identificação de alimentos. "
            "Sua tarefa é analisar a imagem fornecida, identificar os componentes da refeição, "
            "estimar a porção em gramas e os carboidratos de cada item com base em tabelas nutricionais "
            "como TACO e USDA. Retorne sempre um JSON padronizado."
        )

        user_content: list = []
        if prompt_text:
            user_content.append({"type": "text", "text": prompt_text})

        # Adiciona a instrução de saída JSON ao prompt do usuário
        user_content.append({"type": "text", "text": (
            "Com base na imagem, identifique os principais itens alimentares e estime os carboidratos. "
            "Retorne a resposta EXCLUSIVAMENTE no seguinte formato JSON:\n"
            "{\n"
            "  \"refeicao_detectada\": \"Sim\" ou \"Não\",\n"
            "  \"componentes\": [\n"
            "    { \"nome\": \"Nome do alimento\", \"porcao_g\": 150, \"carboidratos_g\": 45 },\n"
            "    { \"nome\": \"Nome do alimento 2\", \"porcao_g\": 100, \"carboidratos_g\": 14 }\n"
            "  ],\n"
            "  \"total_carboidratos_g\": 59,\n"
            "  \"observacoes\": \"Observações gerais sobre a refeição.\"\n"
            "}"
        )})
        user_content.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:{mime_type};base64,{base64_image}"
            },
        })

        messages: list[ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam] = [
            ChatCompletionSystemMessageParam(role="system", content=system_prompt),
            ChatCompletionUserMessageParam(role="user", content=user_content),
        ]

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=800,
            response_format=ResponseFormatJSONObject(type="json_object")
        )

        # O modelo deve retornar um JSON válido, então tentamos parseá-lo
        raw_content = response.choices[0].message.content or ""
        json_response = json.loads(raw_content)
        return json_response
    except json.JSONDecodeError as e:
        print(f"Erro ao decodificar JSON da resposta da OpenAI: {e}")
        print(f"Resposta bruta: {raw_content}")
        return None
    except Exception as e:
        print(f"Erro ao chamar a API da OpenAI: {e}")
        return None

def simple_chat_command(user_prompt: str) -> str | None:
    """
    Envia um prompt de texto simples para o ChatGPT e retorna a resposta.
    """
    try:
        client = get_client()
        messages: list[ChatCompletionUserMessageParam] = [
            {"role": "user", "content": user_prompt}
        ]
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=100
        )
        if response.choices and response.choices[0].message.content:
            return response.choices[0].message.content
        return None
    except AuthenticationError:
        print("Erro de autenticação ao tentar comando simples no ChatGPT. Verifique sua chave API.")
        return None
    except APIConnectionError:
        print("Erro de conexão ao tentar comando simples no ChatGPT. Verifique sua rede.")
        return None
    except RateLimitError:
        print("Erro de limite de taxa ao tentar comando simples no ChatGPT. Sua conta pode ter sido excedida.")
        return None
    except Exception as e:
        print(f"Erro inesperado ao tentar comando simples no ChatGPT: {str(e)}")
        return None
