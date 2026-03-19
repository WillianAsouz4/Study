# Conceitos Aplicados no GlicoGuide

Material de estudo baseado no que foi desenvolvido hoje.

---

## 1. Flask — Fundamentos

Flask é um **microframework web** para Python. "Micro" não significa limitado — significa que ele é simples e você adiciona o que precisar.

### Como funciona uma requisição
```
App Mobile → HTTP Request → Flask (rota) → Lógica → Banco → HTTP Response → App Mobile
```

### Rota simples
```python
@app.route('/info')
def info():
    return jsonify({"app": "GlicoGuide"})
```
- `@app.route` — define qual URL aciona essa função
- `jsonify` — transforma um dicionário Python em JSON para retornar ao cliente

### Métodos HTTP
| Método | Uso |
|--------|-----|
| GET | Buscar dados |
| POST | Criar dados |
| PUT | Atualizar dados |
| DELETE | Deletar dados |

---

## 2. Blueprint — Organização de Rotas

Blueprint é uma forma de **dividir as rotas em arquivos separados**, como pastas de um projeto.

```python
# blueprints/auth.py
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    ...
```

```python
# app.py — registra o blueprint com um prefixo
app.register_blueprint(auth_bp, url_prefix='/api/auth')
# Resultado: POST /api/auth/login
```

**Por que usar?**
Sem blueprints, tudo ficaria no `app.py` — difícil de manter. Com blueprints, cada funcionalidade tem seu arquivo.

---

## 3. SQLAlchemy — ORM

ORM (Object-Relational Mapper) permite **trabalhar com o banco de dados usando Python**, sem escrever SQL manualmente.

### Sem ORM (SQL puro)
```sql
INSERT INTO users (name, email) VALUES ('João', 'joao@email.com');
```

### Com ORM (SQLAlchemy)
```python
user = User(name='João', email='joao@email.com')
db.session.add(user)
db.session.commit()
```

### Tipos de colunas
```python
db.Column(db.Integer, primary_key=True)   # número inteiro, chave primária
db.Column(db.String(150), nullable=False) # texto, obrigatório
db.Column(db.Float)                       # número decimal
db.Column(db.Text)                        # texto longo
db.Column(db.DateTime)                    # data e hora
db.Column(db.Boolean)                     # verdadeiro/falso
```

### Relacionamentos
```python
# Meal tem muitos MealItems (1 para N)
class Meal(db.Model):
    items = db.relationship('MealItem', backref='meal', lazy=True)

class MealItem(db.Model):
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'))
```
- `ForeignKey('meals.id')` — aponta para a tabela `meals`, coluna `id`
- O nome deve ser igual ao `__tablename__` do model referenciado

---

## 4. Flask-Migrate — Migrations

Migrations são o **histórico de mudanças do banco de dados**. Como um git, mas para a estrutura do banco.

### Fluxo sempre que mudar um model
```bash
# 1. Gera o arquivo de migration (detecta as mudanças)
flask --app app db migrate -m "descrição da mudança"

# 2. Aplica no banco
flask --app app db upgrade
```

### Por que usar?
Sem migrations, você teria que alterar o banco manualmente em cada ambiente (dev, produção, colega de trabalho). Com migrations, basta rodar `db upgrade`.

---

## 5. JWT — Autenticação

JWT (JSON Web Token) é um **token assinado** que prova que o usuário está autenticado.

### Fluxo
```
1. Usuário faz login com email + senha
2. Servidor verifica as credenciais
3. Servidor gera um token JWT e retorna
4. Usuário guarda o token
5. Em cada requisição, envia o token no header
6. Servidor valida o token e identifica o usuário
```

### Estrutura do token
```
eyJhbGci.eyJzdWIi.SflKxwRJ
   ↑          ↑         ↑
 Header    Payload   Assinatura
```

O **Payload** contém dados como o ID do usuário. Você pode decodificar em [jwt.io](https://jwt.io).

### No código
```python
# Gerar token no login
token = create_access_token(identity=str(user.id))

# Proteger uma rota (próximo passo)
@app.route('/calcular_insulina', methods=['POST'])
@jwt_required()
def calcular_insulina():
    user_id = get_jwt_identity()  # pega o ID do usuário do token
```

### JWT_SECRET_KEY
É a chave usada para **assinar** o token. Se alguém não tiver essa chave, não consegue forjar um token válido. Por isso deve ser longa e secreta.

---

## 6. Hashing de Senha

Nunca salve senhas em texto puro no banco. Use **hash**.

```python
from werkzeug.security import generate_password_hash, check_password_hash

# Salvar senha (converte "123456" em "pbkdf2:sha256:...")
self.password = generate_password_hash("123456")

# Verificar senha no login
check_password_hash(self.password, "123456")  # retorna True ou False
```

**Por que hash e não criptografia?**
Hash é **irreversível** — não dá para descriptografar. Mesmo que o banco vaze, as senhas ficam seguras.

---

## 7. Variáveis de Ambiente (.env)

Configurações sensíveis (chaves de API, senhas) nunca devem ficar no código — ficam no `.env`.

```bash
# .env
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
JWT_SECRET_KEY=abc123...
```

```python
# Carrega o .env para o ambiente
from dotenv import load_dotenv
load_dotenv()  # deve ser chamado ANTES de os.getenv()

# Lê a variável
import os
chave = os.getenv("OPENAI_API_KEY")
```

**Regra de ouro:** o `load_dotenv()` deve ser chamado **antes** de qualquer `os.getenv()`. Se não, retorna `None`.

---

## 8. Import Circular

Acontece quando dois arquivos tentam se importar mutuamente.

```
app.py importa auth.py
auth.py importa user.py
user.py importa app.py  ← loop!
```

### Solução: arquivo de extensões
```python
# extensions.py — não importa nada do projeto
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
```

```python
# Todos importam de extensions.py, não de app.py
from extensions import db
```

---

## 9. Códigos HTTP

| Código | Significado | Quando usar |
|--------|-------------|-------------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos ou faltando |
| 401 | Unauthorized | Não autenticado |
| 403 | Forbidden | Autenticado mas sem permissão |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Conflito (ex: email já cadastrado) |
| 500 | Internal Server Error | Erro no servidor |

---

## 10. Próximos Conceitos (próxima sessão)

- **`@jwt_required()`** — proteger rotas com autenticação
- **`get_jwt_identity()`** — pegar o ID do usuário logado
- **`db.session`** — salvar, atualizar e deletar no banco
- **Relacionamentos no SQLAlchemy** — buscar refeições de um usuário específico
