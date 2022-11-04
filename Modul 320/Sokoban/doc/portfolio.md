# Portfolio Modul 320

## Anforderungen

### Benutzerschnittstelle

- 2 Der Spieler startet dazu eine lokale Anwendung auf seinem PC.
- 7 Ein Spieler kann seine eigene Spielfigur über die Tasten W, A, S und D in die vier Himmelsrichtungen bewegen. Dabei
  kann er nur freie Kacheln betreten.
- 8 Auf der Oberfläche bestehen Button mit denen man den Spielverlauf steuern kann.
- 12 Der Spielverlauf wird in einem dafür geeigneten Format angezeigt.
- 13 Im Nachrichtenbereich erscheinen laufend Nachrichten über den Spielablauf.

### Spielablauf

- 1 Ein Spiel besteht aus einem Spieler.
- 3 Beim Start des Spiels erscheint das Labyrinth, welches als Textdatei in einer Datei zur Verfügung steht und geladen
  wird.
- 4 Das Labyrinth ist eine zweidimensionale Matrix von Kacheln (Englisch: tiles).
- 5 Eine Kachel kann frei sein oder durch einen Spielfigur, Wand usw. belegt sein.
- 6 Am Anfang des Spiels werden die Spielelemente nach einer Vorgabe verteilt.
- 7 Ein Spieler kann seine eigene Spielfigur über die Tasten W, A, S und D in die vier Himmelsrichtungen bewegen. Dabei
  kann er nur freie Kacheln betreten.
- 9 Ein Spieler kann sich beliebig viel auf dem Spielfeld bewegen, jedoch nicht auf ein Feld mit einer Wand.
- 10 Das Labyrinth, die Kisten und die Spielfigur werden laufend auf der Anwendungen aktualisiert.
- 11 Wenn alle Kisten auf den dafür vorgesehenen Punkte stehen, ist das Spiel zu Ende.
- 13 Im Nachrichtenbereich erscheinen laufend Nachrichten über den Spielablauf.

### Spielelemente

- 1 Ein Spiel besteht aus einem Spieler.

## Wichtigste Elemente von Klassen Diagrammen

- Klassen mit Methoden, Eigenschaften und Sichtbarkeit
- Schnittstellen
- Beziehungen wie Komposition, Aggregation, Generalisierung, Assoziation

## Sprache

Ich habe das Spiel Sokoban in der Sprache Java umgesetzt und als Build-Tool Gradle gewählt. Für Java habe ich mich
entschieden da wir gar kein Wahl hatten und einfach Java wählen mussten. Für Gradle habe ich mich entschieden da ich
damit schon erfahrung gesammelt habe und nicht der grösste Fan eines statischen XML-Files bin.

## Klassen Diagramm

Da ich das Klassendiagramm fortlaufen aktualisiert habe, ist die das fertige Klassendiagramm:

![Sokoban Klassendiagramm](/images/Klassendiagram_Sokoban.drawio.png "Mein Klassendiagramm")

## Unterschied zwischen private, public usw...

### private

private ist nur innerhalb einer Klasse zugänglich und muss von ausserhalb der Klasse mit einer Methode zugegriffen
werden wie einem Getter oder Setter.

### public

public kann von überall aus zugegriffen werden und braucht nicht umbedingt einen Getter oder Setter.

### protected

protected ist nur innerhalb der Vererbungshierarchie gegen oben Sichtbar.

## Namensgebung

Ich habe mich bei Klassennamen einfach daran orientiert was die Klasse ist. Wenn es zum Beispiel eine Szene ist welche
für den Spielablauf zuständig ist habe ich diese Klasse "GameScene" genannt. Bei den Packages habe ich versucht alles
was zusammen gehört in das selbe Package zu packen. Alle Modelle wie Level oder Gameobject habe ich in das model package
gepackt. Alles was für das Aussehen zuständig ist, also die Scenes habe ich in das gui package gepackt. Das gui package
line auch view heissen aber ich fand gui passender. Alles was mit dem Spielverlauf, also dem Game zu tun hat, wurde ins
game package gepackt. Diese package enthält alles für controller/handler.

## Documentation mit Javadoc

Javadoc dient dazu, dass der Code einfach verständlich ist und man nicht in 100 weitere Klassen nachschauen muss was
eine
Klasse überhaupt macht. Das Ganze hilft zum Beispiel einem neuen Mitarbeiter schnell in einem Projekt klarzukommen.

Ich habe alles Klassen, Eingenschaften und Funktionen mit Javadoc dokumentiert. Bei Klassen nutzte ich zusätzlich den
@author Tag da wir dass in der Firma auch so machen und ich es mit einfach gewöhnt bin. Eigenschaften haben bei mir kein
zusätzliches Tag zur Dokumentation. Jedoch nutzte ich bei Methoden den @param Tag umd die einzelnen Parameter der
Funktion zu dokumentieren und den @return Tag um den Rückgabewert der Methode zu dokumentieren.

## Aufgabe Sichtbarkeit von Variablen

Die Variable B wird nicht erkannt da diese in einem tieferen Sichtbarkeitsbereich deklariert und initialisiert wurde.
Denn dies geschieht in eine Codeblock welcher mit geschweiften Klammer abgetrennt ist und somit ist die Variable b nur
in
diesem Codeblock sichtbar.

## Kontrollanweisungen

### if/else

```
if(Kondition){
  Wird ausgeführt wenn Kondition true ist
}
else{
  Wird ausgeführt wenn Kondition false ist
}
```

Ist eine Verzweigung welche je nach kondition etwas oder etwas anderes ausführt. Der else-Teil ist dabei nicht Pflicht.

### switch

```
switch(espression){
  case a -> {Do-Something;}
  case b -> {Do-Something;}
  case c : {
      Do-Something;
      break;
    }
    default -> {Do-Something}
}
```

Switch führt etwas aus je nach wert der expression. Wenn die expression den wert von a hat wird der Code nach a
ausgeführt, mit Wert b wird b ausgeführt usw...
Mittlerweile braucht es kein break mehr wenn man die Lambda-Schreibweise verwendet. Dies ist jedoch nur in de neuen
Java-Version der Fall. Der Default Fall ist auch wie dass Else oben optional.

### for-loop

```
for(int i = 0; i < 10; i++){
  Do-Something;
}

int[] array = [1, 2, 5, 9]
for(int zahl: array){
  Do-Something;
}

```

Die for-loop für etwas eine bestimmte Anzahl mal aus. Die entweder anhand einer Zahl/Anzahl oder anhand von Elementen
in einer Collection.

### while-loop

```
while(kodition){
  do-something
}

```

Die While-Loop führt etwas so lange aus bis die Kondition nicht mehr true ist.

## Exceptions

### ArithmeticException

Diese Exception wird geworfen wenn eine arithmetische Operation einen Ausnahmefall erzeugt welche nicht möglich ist.
Einer davon ist wenn ich z.B. 5 durch 0 rechen will.

### ArrayIndexOutOfBoundsException

Diese Exception wird geworfen wenn ich z.B. einen Array habe welcher 6 Zahlen enthält und ich die Zahl mit index 6 aus
dem array auslesen möchte. Da dies jedoch nicht möglich ist bei 6 objekten wird diese Exception geworfen.

### ClassNotFoundException

Diese Exception wird geworfen wenn man versucht auf eine Klasse zuzugreifen diese aber von ClassLoader nicht erkannt
wird.

### FileNotFoundException

Diese Exception wird geworfen, wenn ein File nicht gefunden wird, weil es z.B. nicht existiert oder einfach ein falscher
Pfad angegeben wird.

### IOException

Wenn diese Exception geworfen wird heisst dass dass eine Input/Output Ausnahme aufgetreten ist.

### InterruptedException

Die Methode wird meinem Wissen nach geworfen wenn ein Thread pausiert ist oder schläft oder abgebrochen wurde.

### NoSuchFieldException

Die Exception wird geworfen wenn versucht wird auf ein Field zuzugreifen diese jedoch nicht existiert. Z.B wenn ich
versuche person.age aufzurufen, dieses Field aber nicht existiert.

### IllegalArgumentException

Diese Exception wird geworfen wenn ich z.B. eine Methode ungültige Argumente übergebe. Z.B wenn ich einer Methode welche
einen String als Parameter nimmt einen Integer übergebe.

## Testklasse Sokoban E1E

Ich habe den Teil des Codes aus der Aufgabe gemäss Auftrag getestet und im Test-Ordner abgelegt.

## Code Review

Ein Code Review habe ich mit Marco Jaros über Discord durchgeführt. Dabei haben wir uns in der Zeit während dem Modul
320 3-mal ein komplettes Codereview vim Ganzen Code gemacht und und verbesserungsvorschläge gemacht.