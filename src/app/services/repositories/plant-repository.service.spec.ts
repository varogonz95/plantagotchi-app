import { TestBed } from '@angular/core/testing';

import { PlantRepository } from './plant-repository.service';

describe('PlantRepositoryService', () => {
    let service: PlantRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PlantRepository);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
