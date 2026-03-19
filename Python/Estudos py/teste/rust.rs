fn main() {
    verificar_par_ou_impar();
}

fn verificar_par_ou_impar() {
    let mut entrada = String::new();

    println!("Digite um numero:");

    std::io::stdin()
        .read_line(&mut entrada)
        .expect("Erro ao ler a entrada");

    let numero: i32 = entrada
        .trim()
        .parse()
        .expect("Digite um numero inteiro valido");

    if numero % 2 == 0 {
        println!("O numero {numero} e par.");
    } else {
        println!("O numero {numero} e impar.");
    }
}

let flout: f32 = 4.23
