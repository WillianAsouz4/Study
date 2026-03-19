package tesk;

import java.util.Scanner;

public class tesk {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int N = sc.nextInt();

        if (N < 0) {
            System.out.println( "É NEGATIVO");
        }
        else {
            System.out.println( "não É POSITIVO");
        }

        sc.close();

    }
}
