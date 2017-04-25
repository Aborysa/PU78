



export const jsonToCourse = (data) => {
  let c = new Course(
    data.idCourse,
    data.name
  );
  return c;
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