import {TeacherRatingDto} from "./teacher-rating.dto";

export class TeacherDto {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  ratings: TeacherRatingDto;
}
