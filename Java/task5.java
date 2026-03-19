package tesk;

import java.util.Scanner;

public class task5 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int Code = sc.nextInt();
        int Quantidade = sc.nextInt();

        double total;

        if (Code == 1) {
            total = Quantidade * 4.0;
        } else if (Code == 2) {
            total = Quantidade * 4.5;
        } else if (Code == 3) {
            total = Quantidade * 5.0;
        } else if (Code == 4) {
            total = Quantidade * 2.0;
        } else {
            total = Quantidade * 1.5;
        }

        System.out.println("Total: R$ " + total);

        sc.close();

    }
}
