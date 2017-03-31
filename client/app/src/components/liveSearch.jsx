import React from "react";
import { Navbar, FormGroup, FormControl } from "react-bootstrap";
import { Subject } from 'rxjs';

export class LiveSearch extends React.Component{
  constructor(props) {
    super(props);
    this.searchSubject = new Subject();
  }
  onChange(e){
    this.searchSubject.next(e.target.value);
  }
  componentDidMount(){
    this.searchSubject.debounceTime(300).distinctUntilChanged().subscribe(e => this.props.onChange(e));
  }
  render() {
    return (
      <Navbar.Form>
        <FormGroup>
         <FormControl onChange={e => this.onChange(e) } type="text" placeholder="Søk" />
       </FormGroup>
     </Navbar.Form>
   );
  }
}
