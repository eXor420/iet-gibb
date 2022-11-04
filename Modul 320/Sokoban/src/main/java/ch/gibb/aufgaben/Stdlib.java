package ch.gibb.aufgaben;

import java.util.Scanner;

public class Stdlib {
    public static int readInteger() {
        Scanner scanner = new Scanner(System.in);
        String input;
        do {
            System.out.print("Bitte geben sie eine Ganzezahl ein: ");
            input = scanner.nextLine();
        } while (!input.matches("[0-9]+") || input.equals(""));

        return Integer.parseInt(input);
    }

    public static float readFloat() {
        Scanner scanner = new Scanner(System.in);
        String input;
        do {
            System.out.print("Bitte geben sie eine Fliesskommazahl(xxx.xxx) ein: ");
            input = scanner.nextLine();
        } while (!input.matches("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$") || input.equals(""));
        return Float.parseFloat(input);
    }

    public static char readChar() {
        Scanner scanner = new Scanner(System.in);
        String input;
        do {
            System.out.print("Bitte geben sie eine Ziffer ein: ");
            input = scanner.nextLine();
        } while (input.length() > 1 || input.equals(""));
        return input.charAt(0);
    }

    public static String readString() {
        System.out.print("Bitte geben sie Zeichen ein: ");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }

}
