cls
echo Hello!
echo "So verwendest du den Rechner:"`n
echo "1.) Gib eine erste Zahl ein und drücke ENTER" "2.) Gib einen Operator ein und drücke ENTER" "3.) Gib falls danach gefragt wird eine zweite Zahl ein und drücke ENTER "`n
do { <# Mithilfe dieser Do-While-Schleife kann man so viele Berechnungen durchführen wie man möchte #> 
  $finalResult = 0
  $number1 = "" 
  $number2 = ""
  $operator = ""
do { <# Hier wird Mithilfe des Read-Host-Befehls solange die erste Zahl eingelesen bis die Eingabe einer gültigen Ganzzahl entspricht #>
  $number1 = Read-Host "Gib deine erste Zahl ein (Nur positive Ganzzahlen)"  
}
while ( $number1 -notmatch '^[0-9]+$' )
echo "`n"
do { <# Hier wird Mithilfe des Read-Host-Befehls solange der Operator eingelesen bis die Eingabe einem gültigen Operator entspricht #>
  $operator = Read-Host "Wähle einen gültigen Operator (+, -, *, /, %, p(Potenz), s(Wurzel), b(toBinary))"
}
while ( $operator -notmatch '^[+]$|^[-]$|^[*]$|^[/]$|^[%]$|^["p"]$|^["s"]$|^["b"]$' )
echo "`n"
if($operator -ne "s" -and $operator -ne "b") <# In diesem If-Statement wird überprüft ob eine Zweite Zahl für die Berechnung erforderlich ist #>
    {
    do { <# Hier wird Mithilfe des Read-Host-Befehls solange die zweite Zahl eingelesen bis die Eingabe einer gültigen Ganzzahl entspricht #>
    $number2 = Read-Host "Gib deine zweite Zahl ein (Nur positive Ganzzahlen)"  
    }
     while ( $number2 -notmatch '^[0-9]+$' )
    }
switch ($operator)  <# In diesem Switch-Case wird der Wert des Operators überprüft und je nach dem welchen Wert er trägt wird eine andere berechnung durchgeführt #>      
    {                        
        "+" {$finalResult = [int]$number1+[int]$number2}            <# Hier wird die beiden Zahlen Addiert #>             
        "-" {$finalResult = [int]$number1-[int]$number2}            <# Hier wird die erste Zahl minus die zweite Zahl gerechnet #>                 
        "*" {$finalResult = [int]$number1*[int]$number2}            <# Hier wird die beiden Zahlen multipliziert #>     
        "/" {$finalResult = [int]$number1/[int]$number2}            <# Hier wird die erste Zahl durch die zweite dividiert #>     
        "%" {$finalResult = [int]$number1%[int]$number2}            <# Hier wird die erste Zahl modulo die zweite Zahl gerechnet #>    
        "p" {$finalResult=[math]::pow([int]$number1, [int]$number2)}  <# Hier wird die erste Zahl hoch die zeite gerechnet #>    
        "s" {$finalResult=[math]::Sqrt([int]$number1)}                <# Hier wird die Wurzel der ersten Zahl #>    
        "b" {$finalResult=""
              while($number1 -gt 0){ <# Hier wird die erste Zahl zu einer binären zahl konvertiert #>    
              $finalResult = "" + $number1%2 + $finalResult <# Hier wird eine 1 oder eine 0 vor das Ergebniss gehängt damit eine Binäre Zahl entsteht #>    
              $number1 = ($number1 -($number1%2))/2
              if($finalResult.replace(' ','').Length%4 -eq 0 -and $number1 -ne 0) <# Hier werden alle 4 einsen und nullen ein Lehrzeichen eingefügt #>    
              {
                  $finalResult = " " + $finalResult
              }
            }
            for ($i = 0; $i -lt $finalResult.replace(' ','').Length%4; $i++) <# Zum Schluss wird der binären Zahl mit nullen am anfang aufgefüllt damit es immer 4er Blöcke gibt #>    
            { 
                $finalResult = "" + 0 +$finalResult
            }
        }                        
        Default {echo "Berechnung Fehlgeschlagen"}                <# Falls die Berechnugn aus nicht erklärlichen Gründen fehlschläft wird dies auf der Konsole ausgegeben #>            
    }            
echo $finalResult 
echo "`n"
$exit = Read-Host "Wenn du noch eine Berechnung durchführen möchtest drücke ENTER ansonsten gib 'x' ein" 
echo "`n"
cls
}
while ( $exit -ne "x" )