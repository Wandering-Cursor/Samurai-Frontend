export interface StudentInfo {
  id: string; // Assuming the ID is a string since it's described as string($uuid) in your Swagger.
  account_type: string; // Readonly, default value 'Student'.
  email: string; // Readonly.
  first_name: string; // Readonly.
  last_name: string; // Readonly.
  middle_name?: string; // Optional since x-nullable is true.
  profile_picture?: string; // Optional since x-nullable is true, assuming it's a URL string.
  group: GroupInfo;
}

export interface TeacherInfo {
  id: string; // Since it's described as string($uuid).
  account_type: string; // Readonly, default value 'Teacher'.
  email: string; // Readonly.
  first_name: string; // Readonly.
  last_name: string; // Readonly.
  middle_name?: string; // Optional since x-nullable is true.
  profile_picture?: string; // Optional since x-nullable is true, assuming it's a URL string.
  faculties: FacultyInfo[]; // Array of FacultyInfo, readonly and must have unique items.
  contact_information?: string; // Optional since x-nullable is true.
}

export interface OverseerInfo {
  id: string; // Since it's described as string($uuid).
  account_type: string; // Readonly, default value 'Overseer'.
  email: string; // Readonly.
  first_name: string; // Readonly.
  last_name: string; // Readonly.
  middle_name?: string; // Optional since x-nullable is true.
  profile_picture?: string; // Optional since x-nullable is true, assuming it's a URL string.
  faculty: number; // Assuming this is the ID of the related faculty and it's a number.
}

export interface GroupInfo {
  id: number; // Assuming the ID is a number since it's described as integer.
  name: string; // Readonly.
  faculty: FacultyInfo;
}

export interface FacultyInfo {
  id: number; // Assuming the ID is a number since it's described as integer.
  name: string; // Readonly.
}

export interface NewComment {
  task_id: string; // Since it's described as string($uuid).
  file_name?: string; // Optional since x-nullable is true.
  file_content?: string; // Optional since x-nullable is true.
  text?: string; // Optional since x-nullable is true.
}

export interface DeleteCommentInput {
  comment_id: string;
}

export interface UpdateComment {
  comment_id: string;
  file_name: string;
  file_content: string;
  test: string;
}

export interface UpdateTask {
  task_id: string;
  state: TaskState;
}

export enum TaskState {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    IN_REVIEW = 'in_review',
    REOPENED = 'reopened',
    DONE = 'done',
  }
  
  export interface CreateUserProject {
    created_at?: string; // Assuming this is auto-generated by the server
    updated_at?: string; // Assuming this is auto-generated by the server
    name: string;
    description?: string;
    faculty_id: string;
    account_links?: string[];
  }

export interface UserProject {
  id: string; // Since it's described as string($uuid).
  created_at: string; // Assuming ISO date-time string format.
  updated_at: string; // Assuming ISO date-time string format.
  supervisor: ShortTeacherInfo;
  theme: string; // With a maximum length of 255 characters.
  description: string;
  student: string; // Assuming this is a UUID string reference to a related student.
  tasks: string[]; // Array of task UUIDs, with unique items.
}

export interface GetProjectTasksQueryParams {
  page?: number;      // Optional since there is a default value
  page_size?: number; // Optional since there is a default value
  name?: string;      // Optional as it's not marked required
}

export interface PaginationParams {
  page: number;
  page_size: number;
}



export interface ShortTeacherInfo {
  id: string; // Since it's described as string($uuid).
  first_name: string;
  last_name: string;
  middle_name?: string; // Optional since x-nullable is true.
  profile_picture?: string; // Optional since x-nullable is true, assuming it's a URL string.
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface TokenRefreshConfig {
  timeInSeconds: number;
}

export interface Project {
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  faculty_id: string;
  project_id: string;
  tasks: Task[];
  account_links: AccountLink[];
  tasks_count: number;
  _links: Links;
  tasks_count_by_status: TasksCountByStatus;
}

export interface Task {
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  priority: number;
  reviewer: string | null;
  due_date: string | null;
  project_id: string;
  task_id: string;
  state: string;
  comment_count: number;
}

export interface AccountLink {
  account_id: string;
  account_details: AccountDetails;
}

export interface AccountDetails {
  account_id: string;
  email: string;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface Links {
  self: Link;
  tasks: Link;
}

export interface Link {
  href: string;
}

export interface TasksCountByStatus {
  open: number;
  resubmit: number;
  in_progress: number;
  in_review: number;
  done: number;
}

export interface CommentApiResponse {
  meta: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
  };
  content: Comment[];
}

export interface Comment {
  created_at: string;
  updated_at: string;
  file_id: string | null;
  text: string;
  task_id: string;
  sender_id: string;
  comment_id: string;
}

export interface Chat {
  chat_id: string;
  name: string;
  _links: any;
}
