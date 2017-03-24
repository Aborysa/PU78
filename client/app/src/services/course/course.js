



export const jsonToCourse = (data) => {
  return new Course(
    data.idCourse,
    data.name
  );
}


export class Course{
  constructor(id,name){
    this._id = id;
    this._name = name;
  }

  get name(){
    return this._name;
  }
  get id(){
    return this._id;
  }
}