


export class User{
  constructor(id,username,name){
    this._id = id;
    this._username = username;
    this._fullname = name;
  }
  get fullname(){
    return this._fullname;
  }
}
