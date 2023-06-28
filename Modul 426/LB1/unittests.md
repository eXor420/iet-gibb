# Unittests


## Tests

Wir haben unsere Unittests mithilfe von [Jasmine](https://jasmine.github.io/) & [Karma](https://karma-runner.github.io/latest/index.html) in unserem Angular Projekt vom Modul 165 erstellt. Deshalb haben uns dazu entschieden folgende Komponente aus unserem Angular Projekt zu testen. Dies Komponente ist [hier](https://github.com/eXor420/GibbBiVo2021/blob/main/Modul%20165/LB2/frontend/r8-iet-gibb/src/app/components/teacher-card.component.ts) zu finden. Um das Ganze zu dokumentieren haben wir uns für die folgende Methode entschieden:
```
calculateAverageValue(rating: RatingDto[]): number {
  if (rating.length === 0) {
    return -1;
  }

  const sum = rating.reduce((acc, rating) => acc + rating.value, 0);
  return Math.round(sum / rating.length);
}
```
Die gesamte Testklasse ist [hier](https://github.com/eXor420/GibbBiVo2021/blob/main/Modul%20165/LB2/frontend/r8-iet-gibb/src/app/components/teacher-card.component.spec.ts) zu finden.

### Positive Tests
Im folgenden Test wird ein Array von Bewertungen vorbereitet welches insgesamt den Wert 15 hat. Dieses Array geben wir der zu testenden Funktion welche uns nun den Durchschnitt ausgeben solle, welche in der Variable ```result``` gespeichert wird. Zum Schluss wird geprüft ob das Resultat wirklich dem Durchschnitt von 3 entspricht.
```
it('should return the correct average value for a non-empty rating array', () => {
    const rating: RatingDto[] = [
    {value: 3} as RatingDto,
    {value: 4} as RatingDto,
    {value: 5} as RatingDto,
    {value: 2} as RatingDto,
    {value: 1} as RatingDto
  ];
  const result = component.calculateAverageValue(rating);
  expect(result).toBe(3); // (3 + 4 + 5 + 2 + 1) / 5 = 3
});
```
Im nächsten Test wird auch wieder ein Array von Bewertungen erstellt welches der zu testenden Funktion mitgegeben wird, nur dass dieses mal der Durchschnitt keine Volle Zahl ist. Somit wird das Runden überprüft indem der Test den aufgerundeten Wert von 3 erwartet.
```
it('should round the average value to the nearest integer', () => {
  const rating: RatingDto[] = [
    {value: 2} as RatingDto,
    {value: 2} as RatingDto,
    {value: 3} as RatingDto,
    {value: 3} as RatingDto
  ];
  const result = component.calculateAverageValue(rating);
  expect(result).toBe(3);
});
```

### Negative Tests

Im folgenden negativen Test wird ein leeres Array vorbereitet und der zu testenden Funktion mitgegeben. Da die Funktion überprüft ob dass Array leer ist wird als Returnvalue ```-1``` erwartet. 
```
it('should return -1 if the rating array is empty', () => {
  const rating: RatingDto[] = [];
  const result = component.calculateAverageValue(rating);
  expect(result).toBe(-1);
});
```

Im zweiten negativen Test wird ein Array von Bewertungen erstellt, welches bei dem einen Wert keinen Zahlenwert hat. Da in der Funktion mit den gegebenen Zahlen eine mathematische Funktion versucht durchzuführen, dies jedoch nicht möglich ist wird erwartet das das Ergebnis NaN ist, was auch für Not a Number steht. 
```
it('should return NaN for invalid rating values', () => {
  const ratings = [
    { value: 4 } as RatingDto,
    { value: -2 } as RatingDto,
    { value: 7 } as RatingDto,
    { value: 'invalid' },
  ] as RatingDto[];

  const result = component.calculateAverageValue(ratings);

  expect(result).toBeNaN();
});
```