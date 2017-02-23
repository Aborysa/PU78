


export class User{
  constructor(id,username,firstname,lastname){
    this._id = id;
    this._username = username;
    this._firstname = firstname;
    this._lastname = lastname;
  }
  get fullname(){
    return `${this._firstname} ${this._lastname}`;
  }
}
