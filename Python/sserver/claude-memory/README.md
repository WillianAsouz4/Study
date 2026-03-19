# Claude Memory — GlicoGuide

Esses arquivos são memórias do assistente Claude Code para este projeto.

## Como restaurar na nova máquina

Após clonar o repositório, copie os arquivos para o local correto:

```bash
# Descobrir o caminho correto (substitua pelo path do projeto clonado)
PROJECT_PATH=$(pwd)
ENCODED_PATH=$(echo $PROJECT_PATH | sed 's/\//-/g' | sed 's/^-//')

MEMORY_DIR="$HOME/.claude/projects/$ENCODED_PATH/memory"
mkdir -p "$MEMORY_DIR"
cp claude-memory/MEMORY.md "$MEMORY_DIR/"
cp claude-memory/project_glicoguide.md "$MEMORY_DIR/"
```

Ou manualmente:
1. Crie a pasta: `~/.claude/projects/-home-SEU_USUARIO-PATH-DO-PROJETO/memory/`
2. Copie `MEMORY.md` e `project_glicoguide.md` para ela

Após isso, o Claude Code vai lembrar todo o contexto do projeto GlicoGuide.

## Variáveis de ambiente necessárias

Crie um arquivo `.env` na raiz com:
```
DATABASE_URL=postgresql://glicoguide_user:SENHA@localhost:5432/glicoguide
JWT_SECRET_KEY=sua_chave_secreta
OPENAI_API_KEY=sua_chave_openai
```
