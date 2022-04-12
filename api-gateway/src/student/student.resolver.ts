import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateStudentInput } from './input/create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [StudentType])
  students() {
    return this.studentService.getStudents();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => StudentType)
  createStudent(
    @Args('studentCreateInput') studentCreateInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(studentCreateInput);
  }
}
