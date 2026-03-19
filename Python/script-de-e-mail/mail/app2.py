# importaçao do aqruivo 
import smtplib
from email.message import EmailMessage
import mimetypes
import os

# Def os doado de envio 

remetente = 'willianarruda052@gmail.com'
destinatario = 'willian.souza@aluno.unievangelica.edu.br'
##emCopia = 'matheus.carvalho@unievangelica.edu.br'
assunto = 'Solicitação de Orçamento de Peças para Drone'

# Mensagem em texto simples (fallback)
mensagem_texto = """
Prezados,
Estamos solicitando um orçamento referente aos materiais abaixo, em nome da Associação Educativa Evangélica.

Para sua conveniência, os dados completos para a formalização do orçamento (incluindo todas as especificações técnicas e quantidades) seguem no arquivo anexo.
Solicitamos, por gentileza, que o orçamento seja emitido em nome da:

Associação Educativa Evangélica
Ficamos à disposição para quaisquer esclarecimentos adicionais e aguardamos o retorno com a proposta.
Atenciosamente,

Willian A. Souza
(66) 98444-3500
willian.souza@aluno.unievangelica.edu.br
"""

# Mensagem em HTML com links clicáveis
mensagem_html = """
<html>
<body>
    <p>Prezados,</p>
    <p>Estamos solicitando um orçamento referente aos materiais abaixo, em nome da <strong>Associação Educativa Evangélica</strong>.</p>

<table border="1" cellpadding="6" cellspacing="0"
style="border-collapse:collapse; width:100%; font-family:Arial,
sans-serif; font-size:13px; border:1px solid #ccc;">
  <thead style="background-color:#f5f5f5; text-align:left;">
    <tr>
      <th style="width:5%; border:1px solid #ccc;">Nº</th>
      <th style="width:25%; border:1px solid #ccc;">Nome do Item</th>
      <th style="width:55%; border:1px solid #ccc;">Descrição Técnica</th>
      <th style="width:15%; border:1px solid #ccc;">Quantidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #ccc;">1</td>
      <td style="border:1px solid #ccc;"><strong>Motores Brushless</strong></td>
      <td style="border:1px solid #ccc;">Modelos 2806.5, faixa de
1300–1500 KV, eixo Ø 5 mm, furação 16×16 mm, alimentação 6S (22,2
V).</td>
      <td style="border:1px solid #ccc;">4 unid.</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc;">2</td>
      <td style="border:1px solid #ccc;"><strong>Controladora de
Voo</strong></td>
      <td style="border:1px solid #ccc;">Base Arduino Pilot, com IMU e
barômetro integrados, múltiplas UARTs disponíveis para sensores.</td>
      <td style="border:1px solid #ccc;">1 unid.</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc;">3</td>
      <td style="border:1px solid #ccc;"><strong>Receptor RC</strong></td>
      <td style="border:1px solid #ccc;">Protocolo ExpressLRS 2.4 GHz,
compatível CRSF, baixa latência e alta estabilidade de sinal.</td>
      <td style="border:1px solid #ccc;">1 unid.</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc;">4</td>
      <td style="border:1px solid #ccc;"><strong>Transmissor RC
(Rádio)</strong></td>
      <td style="border:1px solid #ccc;">Compatível com ExpressLRS 2.4
GHz, potência ajustável, alcance de longo alcance.</td>
      <td style="border:1px solid #ccc;">1 unid.</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc;">5</td>
      <td style="border:1px solid #ccc;"><strong>Sistema FPV</strong></td>
      <td style="border:1px solid #ccc;">Opção digital (720p–1080p) ou
analógica (1000 TVL), transmissão de vídeo em tempo real.</td>
      <td style="border:1px solid #ccc;">1 unid.</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc;">6</td>
      <td style="border:1px solid #ccc;"><strong>Baterias Li-Po</strong></td>
      <td style="border:1px solid #ccc;">6S (22,2 V), 1500–2200 mAh,
descarga ≥ 75 C, conector XT60.</td>
      <td style="border:1px solid #ccc;">2 unid.</td>
    </tr>
    <tr>
      <td style="border:1px solid #ccc;">7</td>
      <td style="border:1px solid #ccc;"><strong>Carregador de
Baterias</strong></td>
      <td style="border:1px solid #ccc;">Carregador balanceado
compatível com baterias Li-Po 6S, entrada AC/DC 100–240 V.</td>
      <td style="border:1px solid #ccc;">1 unid.</td>
    </tr>
  </tbody>
</table>

    <p>Para sua conveniência, os dados completos para a formalização do orçamento (incluindo todas as especificações técnicas e quantidades) seguem no arquivo anexo.</p>
    
    <p>Solicitamos, por gentileza, que o orçamento seja emitido em nome da:</p>
    <p><strong>Associação Educativa Evangélica</strong></p>
    
    <p>Ficamos à disposição para quaisquer esclarecimentos adicionais e aguardamos o retorno com a proposta.</p>
    
    <p>Atenciosamente,</p>
    
    <p><strong>Willian A. Souza</strong><br>
    <a href="tel:+5566984443500">📱 (66) 98444-3500</a><br>
    <a href="mailto:willian.souza@aluno.unievangelica.edu.br">✉️ willian.souza@aluno.unievangelica.edu.br</a></p>
</body>
</html>
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

# Adicionar versão texto simples
msg.set_content(mensagem_texto)

# Adicionar versão HTML
msg.add_alternative(mensagem_html, subtype='html')

#Anexar o arquivo
for anexo_path in anexos: 
    # Verificar se o arquivo existe
    if not os.path.exists(anexo_path):
        print(f"Arquivo não encontrado: {anexo_path}")
        continue
    
    mime_type, _ = mimetypes.guess_type(anexo_path)

    # Verificação de segurança caso o tipo MIME não seja encontrado
    if mime_type is None:
        print(f"Aviso: Não foi possível adivinhar o tipo do arquivo {anexo_path}. Usando application/octet-stream.")
        mime_type = 'application/octet-stream'

    mime_type, mime_subtype = mime_type.split('/')

    with open(anexo_path, 'rb') as arquivo:
        msg.add_attachment(arquivo.read(), maintype=mime_type, subtype=mime_subtype, filename=os.path.basename(anexo_path))

# Realizar o envio do e-mail
with smtplib.SMTP_SSL("smtp.gmail.com", 465) as email:
    email.login(remetente, senha)
    email.send_message(msg)

print("E-mail enviado com sucesso!")