import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Route
import { LearningRoutingModule } from './learning-routing.module';
import { CoursesModule } from './courses/courses.module';
import { StudentModule } from './student/student.module';
import { InstructorsModule } from './instructors/instructors.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LearningRoutingModule,
    CoursesModule,
    SharedModule,
    StudentModule,
    InstructorsModule
  ]
})
export class LearningModule { }
