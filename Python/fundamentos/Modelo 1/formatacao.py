
nome_completo = "Willia A Souza"
nome_completo_aspas = """Willian A Souza"""
nome_completo_quebra = "Willian \
Souza"


nome = "Willian"
sobrenome = "Arruda"

#Formtção
print("Nome completo (1a)Forma:", nome_completo) #Adicionado o elemento chamando ele no final do documento
print("Nome Completo (2a Forma):" + nome_completo) #Comcatenado o variavel usando "+": ps ele normal mente não tem um espcao
print("Nome Completo (3a Forma):" + " Willian " + "Arruda") # comcatenado dois strings usado o +
print("Nome Completo (4a forma):" + "willian", "Arruda")# comcnado 2 strings usado o + e chamando a outra no final 
print("Nome Completo (5a Forma);", nome_completo_aspas)
print("Nome Completo (7a forma): %s %s" % (nome, sobrenome)) # se estiver formantando 2 ou mas variaveis eles tem que ficar enteparentes 
print("Nome Completo (8a forma): {} {}" .format(nome, sobrenome)) #obrigatoriamente tem que ter o f 
print(f"Nome Completo (9a Forma){nome} {sobrenome}")

#nome_variavel.upper() deixa ele todas em maiusculo
#nome_variavel.lowe() deixa o nome todo o texto minusculo
#nome_variavel[num] com isso eu posso asser o valor corespondente ao o numero dentro da vairavelexit
#nome.count("") usado para eu poder contar numeros ou letras
#nome.find(""), ele retorna a possição do intem com um valor apartir do 0
#nome.encode() # comverte para bytes
#nome.encode().dcoude() decodifica de bytes para texto
#nome.replace("alvo", "Subistituto") é usado para sbustitir uma texto ou numero de alguma variavel








