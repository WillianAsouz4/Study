# importaçao do aqruivo 
import smtplib
from email.message import EmailMessage
import mimetypes
import os # Importe essa biblioteca

# Def os doado de envio 

remetente = 'willianarruda052@gmail.com'
destinatario = 'willian.souza@aluno.unievangelica.edu.br'
##emCopia = 'matheus.carvalho@unievangelica.edu.br'
assunto = 'Solicitação de Orçamento de Peças para Drone'
mensagem = """
Prezados,
Estamos solicitando um orçamento referente aos materiais abaixo, em nome da Associação Educativa Evangélica.

Para sua conveniência, os dados completos para a formalização do orçamento (incluindo todas as especificações técnicas e quantidades) seguem no arquivo anexo.
Solicitamos, por gentileza, que o orçamento seja emitido em nome da:

Associação Educativa Evangélica
Ficamos à disposição para quaisquer esclarecimentos adicionais e aguardamos o retorno com a proposta.
Atenciosamente,

Willian A. Souza

<a href="tel:+5566984443500">(66) 98444-3500</a>

<a href="mailto:willian.souza@aluno.unievangelica.edu.br">willian.souza@aluno.unievangelica.edu.br</a>
"""

senha = 'ioow yejc ubwv vedy'
anexos = [
    '.\\Cartão CNPJ AEE.pdf',
    'Pecas.pdf'
    ]
# Criar o email 

msg = EmailMessage()
msg['From'] = remetente
msg['To'] = destinatario
##msg['Cc'] = emCopia
msg['Subject'] = assunto
msg.set_content(mensagem)

#Anexar o arquivo (comentado para teste)
# Percorrer a lista de anexos
for anexo_path in anexos: 
    mime_type, _ = mimetypes.guess_type(anexo_path)

    # Verificação de segurança caso o tipo MIME não seja encontrado
    if mime_type is None:
        print(f"Aviso: Não foi possível adivinhar o tipo do arquivo {anexo_path}. Usando application/octet-stream.")
        mime_type = 'application/octet-stream'

    mime_type, mime_subtype = mime_type.split('/')

    # Usa anexo_path ao invés de 'anexos'
    with open(anexo_path, 'rb') as arquivo:
        msg.add_attachment(arquivo.read(), maintype=mime_type, subtype=mime_subtype, filename=os.path.basename(anexo_path))
# Realizar o envio do e-mail
with smtplib.SMTP_SSL("smtp.gmail.com", 465) as email:
    email.login(remetente, senha)
    email.send_message(msg)

print ("E-mail enviado com sucesso!")