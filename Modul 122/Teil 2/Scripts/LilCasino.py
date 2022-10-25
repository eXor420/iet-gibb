#!/usr/bin/python3.10

# ------------------------------------------------------------
# Skript: LilCasino.py
# ------------------------------------------------------------

# Um Regex-Pattern zu prüfen
import re

# Damit man die SQLite Datenbank nutzen kann
import sqlite3

#Um zufällige Ganzzahlen zu generieren
from random import randint

# Damit man auf die SQLite Datenbank zugreifen kann
connection = sqlite3.connect("lilcasinoDB.db")
cursor = connection.cursor()

username = ""
coins = 0
again = ""

# Query um zu schauen ob sich schon Tabellen in der Datenbank befinden
cursor.execute("""SELECT COUNT(name) FROM sqlite_master WHERE type='table';""")

# Falls sich keine Tabellen in der Datenbank befinden wird die "User" Tabelle erstellt
if cursor.fetchone()[0] == 0:
    cursor.execute("""CREATE TABLE user (
    username TEXT, password TEXT,
    coins INTEGER)""")

"""
Solange man keine gültige Eingabe trifft, muss man die Eingabe wiederholen. "While - True da Python nicht über eine
"Do-While" Schlaufe verfügt. Dies wurde auch so mit Herr Abplanalp im Voraus besprochen.
"""
while True:
    verifyMethod = input("Willst du dich einloggen(e) oder registrieren(r)?")

    if verifyMethod == "e" or verifyMethod == "r":
        break
    else:
        print("Wiederhole deine Eingabe")

# Funktion um sich einzuloggen
def login():
    global username
    global coins

    # Solange der eingegebene Username nicht in der Datenbank ist muss ein anderer eingegeben werden
    while True:
        username = input("Gib deinen Beutzernamen ein:")
        cursor.execute("""SELECT Count(*) FROM user WHERE username=?;""", (username,))
        if not cursor.fetchone()[0] == 0:
            break
        else:
            print("Username wurde nicht gefunden, versuche es erneut")

    # Solange dass Passwort nicht mit dem Nutzernamen übereinstimmt muss die Eingabe wiederholt werden
    while True:
        password = input("Gib deinen Passwort ein:")
        cursor.execute("""SELECT Count(*) FROM user WHERE username = ? AND password=?;""", (username, password))
        if not cursor.fetchone()[0] == 0:
            break
        else:
            print("Ungültiges Passwort für den Benutzernamen: '", username, "' versuche es erneut")

    # Die Anzahl der Coins wird aus der Datenbank ausgelesen damit der User die richtige Anzahl an Coins hat
    cursor.execute("""SELECT coins FROM user WHERE username = ?;""", (username,))
    coins = cursor.fetchone()[0]

# Funktion um sich zu registrieren
def signup():
    global username
    global coins
    # Solange der eingegebene Username in der Datenbank ist muss ein anderer eingegeben werden
    while True:
        username = input("Gib einen Beutzernamen ein:")
        cursor.execute("""SELECT Count(*) FROM user WHERE username=?;""", (username,))
        if not cursor.fetchone()[0] == 1:
            break
        else:
            print("Username wird bereits verwendet, wähle einen anderen")

    # Solange dass Passwort nicht mit dem PW-Vorgaben übereinstimmt muss die Eingabe wiederholt werden
    while True:
        password = input(
            "Gib deinen Passwort ein(mind. 8 Zeichen, Gross- und Kleinbuchstaben, Zahlen & Sonderzeichen(@$!%*?&):")

        # Regex-Pattern um zu überprüfen ob das eingegebene Passwort mind. 8 Zeichen, Gross- und Kleinbuchstaben, Zahlen & Sonderzeichen(@$!%*?&) enthällt
        if re.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", password):
            break
        else:
            print("Passwort entspricht nicht den Richtlinien, versuche es erneut")

    # Der neu erstellte Accoutn wird mit einem Startkapital von 1000 Coins in die DB gespeichert
    cursor.execute("""INSERT INTO user VALUES (?, ?, 1000 )""", (username, password))
    connection.commit()
    coins = 1000

# Überprüfen ob der User sich registrieren oder einloggen möchte
if verifyMethod == "e":
    login()
else:
    signup()

# Funktion um zufällige ganzzahlen zu generieren wobei man die Anzahl und die Reichweite der Zahlen angeben kann
def generateRandomNumbers(amountOfNumbers, rangeFrom, rangeTo):
    randomNumbers = []
    for i in range(amountOfNumbers):
        randomNumbers.append(randint(rangeFrom, rangeTo))
    return randomNumbers

# Funktion für das Slotmachine-Game
def slotMachine():
    global coins

    # Solange der User nochmals dieses Spiel spielen möchte
    while True:

        #3 Zufällige Zahlen in der Reichweite von 1 bis 3 generieren und in ein Dictionary abfüllen
        generatedNumbers = generateRandomNumbers(3, 1, 3)
        slots = {}
        for i in range(len(generatedNumbers)):
            slots["slot{0}".format(i+1)] = generatedNumbers[i]
        print("Dein Kontostand ist: ", coins)

        # Solange die die Eingabe keine Zahl, kleiner als 0 und grösser als die Coins ist muss die Eingabe wiederholt werden
        while True:
            bet = input("Wie viele Coins möchtest du setzten? ")
            if re.match('^[0-9]+$', bet):
                bet = int(bet)
                if not bet <= 0 and not bet > coins:
                    break
                else:
                    print("Ungültige Eingabe, wiederhole deine Eingabe!")
            else:
                print("Ungültige Eingabe, wiederhole deine Eingabe!")
        coins -= bet

        # Der Gewinn/Verlust wird berechnet
        print(slots.get("slot1"), "|", slots.get("slot2"), "|", slots.get("slot3"))
        if slots.get("slot1") == slots.get("slot2") and slots.get("slot2") == slots.get("slot3"):
            coins = coins + (bet * 5)
            print("Du hast ", bet * 4, "Coins gewonnen")
        else:
            if slots.get("slot1") == slots.get("slot2") or slots.get("slot1") == slots.get("slot3") or slots.get("slot2") == slots.get("slot3"):
                coins = coins + bet - 1
                print("Du hast 1 Coin verloren")
            else:
                print("Du hast gesamten Einsatz verloren")
        print("Dein Kontostand ist nun: ", coins)

        # Die neue anzahl an Coins wird in die DB gespeichert
        cursor.execute("""UPDATE user SET coins = ? WHERE username = ?""", (coins, username))
        connection.commit()

        # Wenn man keine Coins mehr hat wird das Spiel abgebrochen
        if coins <= 0:
            break

        # Man wird gefragt ob man nochmals dieses Spiel spielen möchte
        slotMachineAgain = input("Willst du nochmals spielen (ENTER um nochmals zu spielen) ? ")
        if slotMachineAgain != "":
            break

# Funktion für das Number-Guessing-Game
def numberGuessingGame():
    global coins

    # Solange der User nochmals dieses Spiel spielen möchte
    while True:

        # 1 Zufällige Zahl in der Reichweite von 0 bis 100 generieren
        randomNumber = generateRandomNumbers(1, 0, 100)
        print("Dein Kontostand ist: ", coins)

        # Solange die die Eingabe keine Zahl, kleiner als 0 und grösser als die Coins ist muss die Eingabe wiederholt werden
        while True:
            bet = input("Wie viele Coins willst du setzen? ")
            if re.match('^[0-9]+$', bet):
                bet = int(bet)
                if bet <= 0 or bet <= int(coins):
                    break
                else:
                    print("Ungültige Eingabe, wiederhole deine Eingabe!")
            else:
                print("Ungültige Eingabe, wiederhole deine Eingabe!")
        coins -= int(bet)
        guessCounter = 7
        while True:
            userNumber = input("Wähle eine zahl zwischen 0-100: ")
            if re.match('^[0-9]+$', userNumber):
                userNumber = int(userNumber)
                if 100 >= userNumber >= 0:
                    if userNumber > randomNumber[0]:
                        print("Die zuerratende Zahl ist kleiner")
                    elif userNumber < randomNumber[0]:
                        print("Die zuerratende Zahl ist grösser")
                    else:
                        print("Wow, du hast die Zahl in", 8 - guessCounter, " versuchen richtig geraten")
                    guessCounter -= 1
            else:
                print("Ungültige Eingabe, wiederhole deine Eingabe!")

            # Das Spiel ist nach nach 7 Versuchen oder einem richtigen Guess vorbei
            if guessCounter == 0 or userNumber == randomNumber[0]:
                break

        # Der gewinn wird berechnet
        coins += bet * guessCounter
        print("Dein Kontostand ist nun: ", coins)

        # Die neue anzahl an Coins wird in die DB gespeichert
        cursor.execute("""UPDATE user SET coins = ? WHERE username = ?""", (coins, username))
        connection.commit()

        # Wenn man keine Coins mehr hat wird das Spiel abgebrochen
        if coins <= 0:
            break

        # Man wird gefragt ob man nochmals dieses Spiel spielen möchte
        guessGameAgain = input("Willst du nochmals spielen (ENTER um nochmals zu spielen) ? ")
        if guessGameAgain != "":
            break

# solange der User nochmals spielen will und Coins besitzt
while again == "" and coins > 0:

    # solange die Eingabe ungültig ist muss die Eingabe wiederholt werden
    while True:
        game = input("Möchtest du Slot-Machine(s) oder Number-Guessing-Game(n) spielen? ")
        if game == "s" or game == "n":
            break
        else:
            print("Ungültige Eingabe, wiederhole deine Eingabe!")

    # Es wird überprüft welches Spiel der User spielen möchte
    if game == "s":
        slotMachine()
    else:
        numberGuessingGame()
    if coins <= 0:
        break

    # Man wird gefragt ob man nochmals dieses Spiel spielen möchte
    again = input("Willst du nochmal eins der beiden Spiele spielen (ENTER um nochmals zu spielen) ? ")

# Entweder wird man informiert dass man kein Geld mehr hat und was man dagegen tun kann oder das LilCasino bedankt sich für den Besuch
if coins == 0:
    print("Du hast kein Geld mehr. Erstelle einen neuen Account falls du nochmals spielen willst.")
else:
    print("Vielen Dank für dein Besuch!")