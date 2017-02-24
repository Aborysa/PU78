


export class Event{
  constructor(id,title,start,end,desc,editable){
    this._id = id;
    this._title = title;
    this._start = start;
    this._end = end;
    this._desc = desc;
    this._editable = editable; 
  }
  get id(){
    return this.id;
  }
  get title(){
    return this._title;
  }
  get start(){
    return this._start;
  }
  get end(){
    return this._end;
  }
  get description(){
    return this._desc;
  }
  canEdit(){
    return this._editable;
  }

}