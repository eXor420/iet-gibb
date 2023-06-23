export class RatingDto {
  from: string;
  value: number;


  constructor(from: string, value: number) {
    this.from = from;
    this.value = value;
  }
}
