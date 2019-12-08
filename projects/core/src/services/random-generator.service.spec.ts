import { TestBed } from '@angular/core/testing';

import { RandomGeneratorService } from './random-generator.service';
import { WeightMap } from '@drk/models';

describe('RandomGeneratorService', () => {
  let service: RandomGeneratorService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(RandomGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate random by weight', () => {
    const weightMap: WeightMap = [
      {
        value: 0,
        weight: 2
      },
      {
        value: 1,
        weight: 3
      },
      {
        value: 2,
        weight: 5
      }
    ];
    const totalWeight = weightMap.reduce((total, value) => total + value.weight, 0);
    const results = {};
    const iterations = 10000;
    const precision = 0.1;

    const randomize = service.randomByWeightFactory(weightMap);

    for (let i = 0; i < iterations; i++) {
      const res = randomize();
      if (!(res in results)) {
        results[res] = 0;
      }
      results[res]++;
    }

    weightMap
      .forEach(item => {
        const percent = results[item.value] / iterations;
        expect(percent).toBeCloseTo(item.weight / totalWeight, precision);
      });
  });
});
