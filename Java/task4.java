package tesk;

import java.util.Scanner;

public class task4 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Digite o horario de inicio");

        int HI = sc.nextInt();
        int HF = sc.nextInt();

        int D;

        if (HI < HF) {
            D = HF - HI;
        }
        else {
            D = 24 - HI + HF;
        }

        System.out.print("O JOGO DUROU " + D + " HORA(S)");


        sc.close();

    }
}
