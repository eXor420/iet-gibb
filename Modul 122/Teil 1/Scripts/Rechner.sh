#!/bin/bash
#------------------------------------------------------------------
# Rechner.sh
#------------------------------------------------------------------
clear
echo Hello!
echo "So verwendest du den Rechner:"
echo -e "1.) Gib eine erste Zahl ein und drücke ENTER\n2.) Gib einen Operator ein und druecke ENTER\n3.) Gib falls danach gefragt wird eine zweite Zahl ein und druecke ENTER"
while ! [[ $exit == "x" ]]; do # Mithilfe dieser Do-While-Schleife kann man so viele Berechnungen durchführen wie man möchte
    finalResult=0
    number1=""
    number2=""
    operator=""
echo -e "\n"
while ! [[ "$number1" =~ ^[0-9]+$ ]]; do # Hier wird Mithilfe des Read-Host-Befehls solange die erste Zahl eingelesen bis die Eingabe einer gültigen Ganzzahl entspricht
    read -p "Gib deine erste Zahl ein (Nur positive Ganzzahlen): " number1
done
echo -e "\n"
echo "Welchen Operator waehlst du? (+, -, *, /, %, p(Potenz), s(Wurzel), b(toBinary))"
while ! [[ $operator =~ (^[+]$|^[-]$|^[*]$|^[/]$|^[%]$|^["p"]$|^["s"]$|^["b"]$) ]]; do # Hier wird Mithilfe des Read-Host-Befehls solange der Operator eingelesen bis die Eingabe einem gültigen Operator entspricht
    read -p "Gib einen gültigen operator ein: " operator  
done
echo -e "\n"
if ! [[ $operator =~ (^["s"]$|^["b"]$) ]] # In diesem If-Statement wird überprüft ob eine Zweite Zahl für die Berechnung erforderlich ist
then
    while ! [[ "$number2" =~ ^[0-9]+$ ]]; do # Hier wird Mithilfe des Read-Host-Befehls solange die zweite Zahl eingelesen bis die Eingabe einer gültigen Ganzzahl entspricht
    read -p "Gib deine zweite Zahl ein (Nur positive Ganzzahlen): " number2
done
echo -e "\n"
fi
case $operator in # In diesem Switch-Case wird der Wert des Operators überprüft und je nach dem welchen Wert er trägt wird eine andere berechnung durchgeführt
  +)
    finalResult=$(($number1+$number2)) ;; # Hier wird die beiden Zahlen Addiert
  -)
    finalResult=$(($number1-$number2)) ;; # Hier wird die erste Zahl minus die zweite Zahl gerechnet
  "*")
    finalResult=$(($number1*$number2)) ;; # Hier wird die beiden Zahlen multipliziert
  /)
    finalResult=$(($number1/$number2)) ;; # Hier wird die erste Zahl durch die zweite dividiert
  %)
    finalResult=$(($number1%$number2)) ;; # Hier wird die erste Zahl modulo die zweite Zahl gerechnet
  p)
    finalResult=$(($number1**$number2)) ;; # Hier wird die Wurzel der ersten Zahl
  s)
    finalResult=`echo "scale=5; sqrt($number1)" | bc` ;;
  b)
    finalResult=""
    while [ $number1 -gt 0 ]; do # Hier wird die erste Zahl zu einer binären zahl konvertiert
    finalResult="$(($number1%2))$finalResult" # Hier wird eine 1 oder eine 0 vor das Ergebniss gehängt damit eine Binäre Zahl entsteht
    number1=$((($number1 -($number1%2))/2))
    trimmedFinalResult=${finalResult/ /""} # Hier werden alle Leerzeichen durch einen Leeren String ersetzt
    trimmedFinalResultLength=${#trimmedFinalResult} # Hier wird die länge des Strings gemessen und in eine Variable gespeichert
    finalResult4BitBlocks=$((trimmedFinalResultLength%4))
    if [[ "$finalResult4BitBlocks" -eq 0 && "$number1" -ne 0 ]] # Hier werden alle 4 einsen und nullen ein Lehrzeichen eingefügt
    then
       finalResult=" "$finalResult 
    fi
    done
    trimmedFinalResult=${finalResult/ /""}
    trimmedFinalResultLength=${#trimmedFinalResult}
    finalResult4BitBlocks=$((trimmedFinalResultLength%4))
    if [ "$finalResult4BitBlocks" -ne 0 ] # Zum Schluss wird der binären Zahl mit nullen am anfang aufgefüllt damit es immer 4er Blöcke gibt
    then
       for (( i=1; i<=(4-$finalResult4BitBlocks); i++ ))
       do  
       finalResult="0"$finalResult
       done
    fi ;;
  *)
    echo "Berechnung Fehlgeschlagen" ;; # Falls die Berechnugn aus nicht erklärlichen Gründen fehlschläft wird dies auf der Konsole ausgegeben
esac
echo $finalResult 
echo -e "\n"
read -p "Wenn du noch eine Berechnung durchführen möchtest drücke ENTER ansonsten gib 'x' ein: " exit
clear
done
