import {TeacherCardComponent} from "./teacher-card.component";
import '@angular/compiler';
import {RatingDto} from "../model/rating.dto";
import {TeacherAbsoluteRatingDto} from "../model/teacher-absolute-rating.dto";
import {TeacherDto} from "../model/teacher.dto";


describe('TeacherCardComponent', () => {
  let component: TeacherCardComponent;

  beforeEach(() => {
    component = new TeacherCardComponent(null, null);
  });

  describe('calculateAverageValue', () => {
    // negative test
    it('should return -1 if the rating array is empty', () => {
      const rating: RatingDto[] = [];
      const result = component.calculateAverageValue(rating);
      expect(result).toBe(-1);
    });

    // negative test
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


    // positive test
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

    // positive test
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
  });

  describe('createTeacherAbsoluteRatingDto', () => {
    it('should return the teacher absolute rating DTO with correct average values', () => {
      const teacher = new TeacherDto();
      teacher.ratings = {
        knowledge: [
          { value: 4 } as RatingDto,
          { value: 3 } as RatingDto,
          { value: 5 } as RatingDto,
        ],
        communication: [
          { value: 2 } as RatingDto,
          { value: 4 } as RatingDto,
          { value: 3 } as RatingDto,
        ],
        engagement: [
          { value: 5 } as RatingDto,
          { value: 5 } as RatingDto,
          { value: 4 } as RatingDto,
        ],
        creativity: [
          { value: 3 } as RatingDto,
          { value: 4 } as RatingDto,
          { value: 3 } as RatingDto,
        ],
        supportiveness: [
          { value: 2 } as RatingDto,
          { value: 2 } as RatingDto,
          { value: 3 } as RatingDto,
        ],
        receptivenessToFeedback: [
          { value: 5 } as RatingDto,
          { value: 4 } as RatingDto,
          { value: 4 } as RatingDto,
        ],
      };

      const expectedDto = new TeacherAbsoluteRatingDto();
      expectedDto.knowledge = '4'; // (4 + 3 + 5) / 3 = 4
      expectedDto.communication = '3'; // (2 + 4 + 3) / 3 = 3
      expectedDto.engagement = '5'; // (5 + 5 + 4) / 3 = 5
      expectedDto.creativity = '3'; // (3 + 4 + 3) / 3 = 3
      expectedDto.supportiveness = '2'; // (2 + 2 + 3) / 3 = 2
      expectedDto.receptivenessToFeedback = '4'; // (5 + 4 + 4) / 3 = 4

      component._teacher = teacher
      const result = component.createTeacherAbsoluteRatingDto();
      expect(result).toEqual(expectedDto);
    });

    it('should handle the case where there are no ratings available', () => {
      const teacher = new TeacherDto();
      teacher.ratings = {
        knowledge: [],
        communication: [],
        engagement: [],
        creativity: [],
        supportiveness: [],
        receptivenessToFeedback: [],
      };

      const expectedDto = new TeacherAbsoluteRatingDto();
      expectedDto.knowledge = '-';
      expectedDto.communication = '-';
      expectedDto.engagement = '-';
      expectedDto.creativity = '-';
      expectedDto.supportiveness = '-';
      expectedDto.receptivenessToFeedback = '-';

      component._teacher = teacher;

      const result = component.createTeacherAbsoluteRatingDto();
      expect(result).toEqual(expectedDto);
    });
  });



});
