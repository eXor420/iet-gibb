import {RatingDto} from "./rating.dto";

export class TeacherRatingDto {
  knowledge: RatingDto[];
  communication: RatingDto[];
  engagement: RatingDto[];
  creativity: RatingDto[];
  supportiveness: RatingDto[];
  receptivenessToFeedback: RatingDto[];
}
