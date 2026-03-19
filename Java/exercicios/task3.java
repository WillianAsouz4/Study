package tesk;

import java.util.Scanner;

public class task3 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Digite um numero?");
        int A = sc.nextInt();
        int B = sc.nextInt();

        if (A % B == 0 || B % A == 0) {
            System.out.print("São Multipolos");
        }
        else {
            System.out.print("Não são multiplos");
        }

        sc.close();

    }
}
