# GlicoGuide API — Documentação

Base URL: `http://localhost:5001`

---

## Autenticação

As rotas protegidas requerem o token JWT no header:
```
Authorization: Bearer <token>
```

---

## Rotas Públicas

---

### GET /
Retorna mensagem de boas-vindas e lista de endpoints.

**Resposta 200**
```json
{
  "message": "Bem-vindo ao servidor Flask! Acesse /info para mais detalhes.",
  "endpoints": {
    "GET /": "Mensagem de boas-vindas",
    "GET /info": "Informações sobre o aplicativo",
    "POST /upload_imagem": "Rota para upload de imagens"
  }
}
```

---

### GET /info
Retorna informações sobre o aplicativo.

**Resposta 200**
```json
{
  "app_name": "GlicoGuide - easy diabetes management",
  "version": "1.0.0",
  "description": "GlicoGuide é um aplicativo para facilitar o gerenciamento de diabetes.",
  "documentation": "https://glicoguide.com.br",
  "author": "GlicoGuide Research and Development Team",
  "contact": "@glicoguide"
}
```

---

### GET /check_openai_connection
Verifica se a conexão com a API da OpenAI está funcionando.

**Resposta 200**
```json
{
  "status": "Conexão com OpenAI estabelecida com sucesso!"
}
```

**Resposta 500**
```json
{
  "error": "Falha ao conectar com a OpenAI."
}
```

---

### GET /test_chatgpt_command
Envia um prompt de texto ao ChatGPT e retorna a resposta.

**Query params**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| prompt | string | Não | Texto a enviar (padrão: "Qual o seu nome e quem te criou?") |

**Exemplo**
```
GET /test_chatgpt_command?prompt=Qual a capital do Brasil?
```

**Resposta 200**
```json
{
  "status": "success",
  "requested_prompt": "Qual a capital do Brasil?",
  "chatgpt_response": "A capital do Brasil é Brasília."
}
```

---

### POST /upload_imagem
Faz upload de uma imagem e salva no servidor.

**Body (form-data)**
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| imagem | file (PNG, JPG, JPEG) | Sim |

**Resposta 201**
```json
{
  "message": "Imagem enviada e salva com sucesso!",
  "filename": "foto.jpg"
}
```

**Erros**
| Código | Motivo |
|--------|--------|
| 400 | Nenhuma imagem enviada |
| 400 | Tipo de arquivo não permitido |
| 500 | Falha ao salvar |

---

### POST /analisar_refeicao
Envia uma foto de refeição para o GPT-4o identificar os alimentos e estimar carboidratos.

**Body (form-data)**
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| imagem | file (PNG, JPG, JPEG) | Sim |

**Resposta 200**
```json
{
  "message": "Análise da refeição concluída com sucesso.",
  "analysis": {
    "refeicao_detectada": "Sim",
    "componentes": [
      { "nome": "Arroz branco", "porcao_g": 150, "carboidratos_g": 45 },
      { "nome": "Feijão carioca", "porcao_g": 100, "carboidratos_g": 14 }
    ],
    "total_carboidratos_g": 59,
    "observacoes": "Refeição típica brasileira com carboidratos moderados."
  }
}
```

**Erros**
| Código | Motivo |
|--------|--------|
| 400 | Nenhuma imagem enviada |
| 400 | Tipo de arquivo não permitido |
| 500 | Falha na análise com OpenAI |

---

### POST /calcular_insulina
Analisa a foto da refeição e calcula a dose de insulina bolus com base nos parâmetros do paciente.

**Body (form-data)**
| Campo | Tipo | Obrigatório | Padrão |
|-------|------|-------------|--------|
| imagem | file (PNG, JPG, JPEG) | Sim | — |
| glicemia_atual | float (mg/dL) | Sim | — |
| glicemia_alvo | float (mg/dL) | Não | 100 |
| ratio_carb | float (g/U) | Não | 15 |
| fator_correcao | float (mg/dL por U) | Não | 40 |

**Resposta 200**
```json
{
  "message": "Cálculo realizado com sucesso.",
  "analise_refeicao": {
    "refeicao_detectada": "Sim",
    "componentes": [
      { "nome": "Arroz branco", "porcao_g": 150, "carboidratos_g": 45 }
    ],
    "total_carboidratos_g": 45,
    "observacoes": "Refeição leve."
  },
  "calculo_insulina": {
    "bolus_refeicao_u": 3.0,
    "bolus_correcao_u": 2.0,
    "bolus_total_u": 5.0,
    "detalhes": {
      "total_carboidratos_g": 45,
      "glicemia_atual_mgdl": 180,
      "glicemia_alvo_mgdl": 100,
      "ratio_carb": 15,
      "fator_correcao": 40
    }
  }
}
```

**Erros**
| Código | Motivo |
|--------|--------|
| 400 | Nenhuma imagem enviada |
| 400 | glicemia_atual não informada |
| 400 | Parâmetros numéricos inválidos |
| 500 | Falha na análise com OpenAI |

---

## Autenticação

### POST /api/auth/register
Cria um novo usuário.

**Body (JSON)**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Resposta 201**
```json
{
  "message": "Usuário criado com sucesso."
}
```

**Erros**
| Código | Motivo |
|--------|--------|
| 400 | Nome, email ou senha ausentes |
| 409 | Email já cadastrado |

---

### POST /api/auth/login
Autentica o usuário e retorna um token JWT.

**Body (JSON)**
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Resposta 200**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros**
| Código | Motivo |
|--------|--------|
| 400 | Email ou senha ausentes |
| 401 | Email ou senha inválidos |

---

## Rotas a implementar

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/meals` | Salvar refeição analisada no banco |
| GET | `/api/meals` | Listar histórico de refeições do usuário |
| POST | `/api/glycemia` | Registrar medição de glicemia |
| GET | `/api/glycemia` | Listar histórico de glicemia do usuário |
