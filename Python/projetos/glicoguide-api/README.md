# GlicoGuide Server

API Flask para gerenciamento de diabetes. Analisa fotos de refeições via GPT-4o, estima carboidratos e calcula dose de insulina bolus.

---

## Stack

- **Python 3.14** + **Flask**
- **PostgreSQL** + **SQLAlchemy** + **Flask-Migrate**
- **OpenAI GPT-4o** para análise de imagens
- **JWT** para autenticação

---

## Estrutura do Projeto

```
FlaskProject/
├── app.py                  # Ponto de entrada, rotas principais
├── config.py               # Configurações (DB, JWT)
├── extensions.py           # Instância do SQLAlchemy (evita import circular)
├── models/
│   ├── user.py             # Model de usuário
│   ├── meal.py             # Models de refeição e itens
│   └── glycemia.py         # Model de registro de glicemia
├── blueprints/
│   └── auth.py             # Rotas de autenticação (register/login)
├── services/
│   ├── openai_service.py   # Integração com GPT-4o
│   ├── insulin_service.py  # Cálculo de bolus de insulina
│   └── image_service.py    # Upload de imagens
├── migrations/             # Histórico de migrations do banco
└── .env                    # Variáveis de ambiente (não versionar)
```

---

## Variáveis de Ambiente (.env)

```
OPENAI_API_KEY=sua_chave_openai
DATABASE_URL=postgresql://glicoguide_user:senha@localhost:5432/glicoguide
JWT_SECRET_KEY=sua_chave_jwt
```

---

## Como rodar

```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar migrations
flask --app app db upgrade

# Iniciar servidor
python app.py
```

Servidor sobe em `http://localhost:5001`

---

## Rotas disponíveis

### Públicas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Boas-vindas |
| GET | `/info` | Informações do app |
| GET | `/check_openai_connection` | Verifica conexão com OpenAI |
| GET | `/test_chatgpt_command` | Testa comando no ChatGPT |
| POST | `/api/auth/register` | Cadastro de usuário |
| POST | `/api/auth/login` | Login, retorna token JWT |

### Protegidas (requerem JWT) — a implementar
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/upload_imagem` | Upload de imagem |
| POST | `/analisar_refeicao` | Analisa refeição via GPT-4o |
| POST | `/calcular_insulina` | Calcula dose de insulina |
| POST | `/api/meals` | Salva refeição no banco |
| GET | `/api/meals` | Histórico de refeições |
| POST | `/api/glycemia` | Registra glicemia |
| GET | `/api/glycemia` | Histórico de glicemia |

---

## Banco de Dados

### Tabelas criadas
- `users` — usuários com senha hasheada
- `meals` — refeições analisadas
- `meal_items` — itens individuais de cada refeição
- `glycemia_records` — registros de glicemia

---

## O que falta para o MVP

- [ ] Proteger rotas com `@jwt_required`
- [ ] Salvar refeições analisadas no banco
- [ ] Endpoint de histórico de refeições
- [ ] Endpoint de registro de glicemia
- [ ] Containerizar com Docker
