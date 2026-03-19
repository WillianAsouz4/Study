# Gerenciador de Tarefas Simplis em Python

"""-------------------------------
|                                |
|   Adicionar Tarefa             |
|                                | 
----------------------------------"""

def adicionar_tarefa(tarefas, nome_tarefa):
   tarefa = {"tarefa": nome_tarefa, "completada": False}
   tarefas.append(tarefa)
   print(f"A tarefa {nome_tarefa} foi adicionada com sucesso!")
   return

"""-------------------------------
|                                |
|   visualizar Tarefa            |
|                                | 
----------------------------------"""

def ver_tarefas(tarefas):
  print("\n Tarefas Pendentes:")
  for idx, tarefa in enumerate(tarefas, start=1):
    status = "✔" if tarefa["completada"] else " "
    print(f"{idx}. [{status}] {tarefa['tarefa']}")

"""-------------------------------
|                                |
|   Atualizar Tarefa             |
|                                | 
----------------------------------"""

def update_tarefa(tarefas, idx_tarefa, novo_nome_tarefa):
 
  idx_tarefa = int(idx_tarefa) - 1
  if idx_tarefa >= 0 and idx_tarefa < len(tarefas):
   tarefas[idx_tarefa]["tarefa"] = novo_nome_tarefa
   print(f"Tarefa {idx_tarefa} Atualizada para {novo_nome_tarefa}")
  else: 
    print("Ta faltando coisa ai maninho")
  return

"""-------------------------------
|                                |
|   Completar Tarefa             |
|                                | 
----------------------------------"""

def complit_task(tarefas, idx_tarefa):
  idx_tarefa = int(idx_tarefa) -1

  if idx_tarefa >= 0 and idx_tarefa < len(tarefas):
    tarefas[idx_tarefa]["completada"] = True
    print(f"Tarefa {idx_tarefa} foi completada com sucesso!")
  return

"""-------------------------------
|                                |
|   Deletar Tarefa               |
|                                | 
----------------------------------"""

def delet_task (tarefas, idx_tarefa):
  for tarefa in tarefas:
    if tarefa["completada"]:
      tarefas.remove(tarefa)
      print("Tarefa Completada foi apagada com Sucesso!")
  return
    
tarefas = []

"""-------------------------------
|                                |
|            Menu                |
|                                | 
----------------------------------"""

while True:
 print("\n Menu do Gerenciador de Tarefas")
 print("\n1. Adicionar Tarefa")
 print("2. Visualizar Tarefas")
 print("3. Atulizar Tarefa")
 print("4. Completar Tarefa")
 print("5. apagar Tafera Comculida")
 print("6. Encerar Programa\n")

 escolha = input("Escolha uma opção: ")

 if escolha == "1":
   
   # Adicionar Tarefa
   nome_tarefa = input("Digite o nome da tarefa:")
   adicionar_tarefa(tarefas, nome_tarefa)

 elif escolha == "2":
   
   ver_tarefas(tarefas)

 elif escolha == "3":
     
     ver_tarefas(tarefas)
     idx_tarefa = input("Digite o numero da Tarefa que deseja atulizar:")
     novo_nome = input("Digite o Novo nome da Tarefa:")
     update_tarefa(tarefas, idx_tarefa, novo_nome)

 elif escolha == "4":
    
    ver_tarefas(tarefas)
    idx_tarefa = input("digite o indece da tarefa que deseja completar:")
    complit_task(tarefas, idx_tarefa)

 elif escolha == "5":
   
   ver_tarefas(tarefas)
   idx_tarefa = input("digite o indece da tarefa que deseja apagar:")
   delet_task(tarefas, idx_tarefa)

 elif escolha == "6":
    
    print("Fin do Programa!")

    break