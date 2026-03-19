# aula - 36 modulos de terceiros
# modulos de terceiros são bibliotecas criadas por outros desenvolvedores que podem ser instaladas e utilizadas em nossos projetos para adicionar funcionalidades específicas sem precisar escrever o código do zero.
# request: é um modulo de terceiros muito popular em python que facilita a realização de requisições HTTP, permitindo que os desenvolvedores interajam com APIs, acessem dados da web e realizem operações de rede de forma simples e eficiente.re

print("\nInportacao e uso de modulos de terveiros")
import requests

url = "https://www.uol.com.br"
response = requests.get(url)
print(f"Status code: {url} retornou {response.status_code}")
