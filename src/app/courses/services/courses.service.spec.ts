import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe('Service: CoursesService', () => {

    let coursesService: CoursesService,
        httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CoursesService
            ]
        })
        coursesService = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpTestingController.verify();
    })

    it('function: findAllCourses', () => {
        coursesService.findAllCourses().subscribe((courses) => {
            expect(courses).toBeTruthy('No courses returned');
            expect(courses.length).toBe(12, 'courses total count is wrong');

            const course = courses.find(course => course.id === 11);
            expect(course.titles.description).toBe('Angular Material Course', 'Not finding the correct course');
        });

        const mockRequest = httpTestingController.expectOne('/api/courses');
        expect(mockRequest.request.method).toBe("GET");
        expect(mockRequest.flush({payload: Object.values(COURSES)}));
    })

    it('function: findCourseById', () => {
        const courseId = 10;
        coursesService.findCourseById(courseId).subscribe((course) => {
            expect(course).toBeTruthy('No course returned');
            expect(course.titles.description).toBe('Rxjs and Reactive Patterns Angular Architecture Course');
        })
        const mockRequest = httpTestingController.expectOne('/api/courses/10');
        expect(mockRequest.request.method).toBe('GET');
        expect(mockRequest.flush(COURSES[courseId]));
    })

    it('function: saveCourse', () => {
        const courseId = 1;
        const changes: Partial<Course> = {
                titles: {
                    description: 'A new course'
                }
              };
        coursesService.saveCourse(courseId, changes).subscribe((course) => {
            expect(course.id).toBe(courseId);
            expect(course.titles.description).toBe(changes.titles.description);
        })

        const mockRequest = httpTestingController.expectOne('/api/courses/'+courseId);
        expect(mockRequest.request.method).toBe('PUT');
        expect(mockRequest.request.body.titles.description).toBe(changes.titles.description);
        mockRequest.flush({
            ...COURSES[courseId],
            ...changes
        });
    })

    it('save function returns error if failed', () => {
        const courseId = 1;
        const changes: Partial<Course> = {
                titles: {
                    description: 'A new course'
                }
              };
        coursesService.saveCourse(courseId, changes)
            .subscribe(() => {
                fail('this block should not be executed');
            },(error: HttpErrorResponse) => {
                console.log('error->' ,error);
                expect(error.status).toBe(500);
            })

        const mockRequest = httpTestingController.expectOne('/api/courses/'+courseId);
        expect(mockRequest.request.method).toBe('PUT');
        mockRequest.flush('Save course failed' , {status: 500, statusText: 'Internal server error'});
    })

    it('function: findLessons', () => {
        const courseId = 1;
        coursesService.findLessons(courseId)
        .subscribe(lessions => {
            expect(lessions).toBeTruthy();
            expect(lessions.length).toBe(3);
        })
        const mockRequest = httpTestingController.expectOne(req => req.url === '/api/lessons');
        expect(mockRequest.request.method).toBe('GET');
        expect(mockRequest.request.params.get('courseId')).toBe(courseId.toString());
        expect(mockRequest.request.params.get('filter')).toBe('');
        expect(mockRequest.request.params.get('sortOrder')).toBe('asc');
        expect(mockRequest.request.params.get('pageNumber')).toBe("0");
        expect(mockRequest.request.params.get('pageSize')).toBe("3");

        mockRequest.flush({
            payload: findLessonsForCourse(courseId).slice(0,3)
        })
    })
})