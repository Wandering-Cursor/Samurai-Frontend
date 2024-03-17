export interface InstructorModel {
    id?: any,
    img?: any;
    name?: any,
    course?: any,
    rate?: any;
}

export interface CourseModel {
    id?: any,
    img?: any,
    name?: any,
    category?: any,
    instructor?: any,
    lession?: any,
    duration?: any
    fees?: any
    status?: any
    rating?: any
}

export interface CategoryModel {
    id?: any;
    img?: any;
    name?: any;
}

export interface ListModel {
    id?: any;
    category?: any;
    img?: any;
    name?: any;
    instructor?: any;
    lessons?: any;
    duration?: any;
    students?: any;
    fees?: any;
    rating?: any;
    status?: any;
}