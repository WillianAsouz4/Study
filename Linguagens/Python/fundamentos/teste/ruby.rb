def verificar_par_ou_impar(numero)
	if numero.even?
		"O numero #{numero} e par."
	else
		"O numero #{numero} e impar."
	end
end

print "Digite um numero: "
entrada = gets&.chomp

if entrada && entrada.match?(/^-?\d+$/)
	numero = entrada.to_i
	puts verificar_par_ou_impar(numero)
else
	puts "Entrada invalida. Digite um numero inteiro."
end