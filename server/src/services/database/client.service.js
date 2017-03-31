
let rx = require("rxjs");

class ClientServiceProvider{
  constructor(){
    this.observables = {};
  }




  getClient(db){
    return new rx.Observable(observer => {
      let db_handle;
      let o = this.observables[db];
      if(!o){
        o = {
          count: 0
        }
        db.connect(conn => {
          o.conn = conn;
          observer.next(conn);
        });
        this.observables[db] = o; 
      }else{
        observer.next(o.conn);
      }
      o.count++;
      return () => {
        o.count--;
        if(o.count <= 0){
          o.conn.release();
          this.observables[db] = null;
        }
      }
    });
  }
}

const clientService = new ClientServiceProvider();


module.exports = {
  clientService,
  ClientServiceProvider
}