import java.util.Scanner;

public class demo {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double preco = sc.nextDouble();
        double desconto = (preco < 20.0) ? preco * 0.1 : preco * 0.05;

        System.out.print(desconto);

        // como ficaria da forma normal usado if e
        //double desconto;
        //if (preco < 20.0) {
        //    desconto = preco * 0.1;
        //} else {
        //    desconto = preco * 0.05;
        //}

        sc.close();
    }

}
