export class TeacherFilterState {
  public orderByOption:TeachersOrderBy = TeachersOrderBy.None
  public filter:TeacherFilter = TeacherFilter.AllTeachers
  public sortingType=TeacherSortingType.Ascending
}

export enum TeacherFilter{
  AllTeachers,
  AvailableOnly,
}


export enum TeachersOrderBy{
  None,
  AvailableTime,
  SessionsCount
}

export enum TeacherSortingType{
  Ascending,
  Descending
}
