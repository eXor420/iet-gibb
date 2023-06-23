import {ModuleRatingDto} from "./module-rating.dto";

export class ModuleDto {
  _id: string;
  number: string;
  title: string;
  author: string;
  year: string;
  ratings: ModuleRatingDto;
}
