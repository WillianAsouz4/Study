---
name: project_glicoguide
description: Contexto completo do projeto GlicoGuide - estado atual, o que foi feito e o que falta
type: project
---

## Projeto: GlicoGuide Server

API Flask para gerenciamento de diabetes. Analisa fotos de refeições via GPT-4o, estima carboidratos e calcula dose de insulina bolus.

**Why:** MVP para aplicativo mobile de diabetes. Backend serve uma futura app React Native.

**How to apply:** Ao retomar o projeto, continuar a partir do próximo passo do MVP (proteger rotas com JWT).

---

## Stack
- Python 3.14 + Flask
- PostgreSQL + SQLAlchemy + Flask-Migrate
- OpenAI GPT-4o
- Flask-JWT-Extended
- Porta: 5001

## Banco de dados
- Host: localhost:5432
- DB: glicoguide
- User: glicoguide_user
- pg_hba.conf em: /var/lib/pgsql/data/pg_hba.conf (Fedora)

## Estrutura de arquivos relevantes
- `app.py` — ponto de entrada
- `config.py` — configurações (DB, JWT)
- `extensions.py` — instância do SQLAlchemy (criado para evitar import circular)
- `models/user.py` — User com senha hasheada via werkzeug
- `models/meal.py` — Meal + MealItem
- `models/glycemia.py` — GlycemiaRecord
- `blueprints/auth.py` — register + login com JWT
- `services/openai_service.py` — GPT-4o com tipos corretos do SDK
- `services/insulin_service.py` — cálculo de bolus

## O que foi feito
- [x] API Flask base com rotas de análise de refeição e cálculo de insulina
- [x] Integração com OpenAI GPT-4o (analyze_meal_image, simple_chat_command)
- [x] Correção de bugs no openai_service (tipos SDK, raw_content, MIME detection)
- [x] PostgreSQL configurado e conectado
- [x] Migrations com Flask-Migrate (Alembic)
- [x] Tabelas criadas: users, meals, meal_items, glycemia_records
- [x] Autenticação JWT — register e login funcionando
- [x] Senhas hasheadas com werkzeug

## O que falta para o MVP
- [ ] Proteger rotas existentes com @jwt_required
- [ ] Blueprint de meals (salvar refeição + itens no banco)
- [ ] Blueprint de glycemia (registrar e listar glicemia)
- [ ] Associar análise do GPT-4o ao usuário logado ao salvar
- [ ] Docker + docker-compose
- [ ] App mobile React Native (fase futura)

## Lições aprendidas / armadilhas
- load_dotenv() deve ser chamado ANTES de qualquer import que use os.getenv()
- Import circular resolvido movendo db para extensions.py
- pg_hba.conf no Fedora fica em /var/lib/pgsql/data/ (não em /etc/postgresql/)
- ForeignKey('users.id') — nome deve ser igual ao __tablename__ do model
- check_openai_connection() retorna tupla (bool, str), não bool simples
- Usuário quer aprender enquanto desenvolve — sempre explicar o quê, porquê e como
