import React from 'react'
import AppModal from './modal'
import 'bootstrap/dist/css/bootstrap.css';
import { Table,Button } from 'reactstrap'
import json from '../Test JSON.json'
import axios from 'axios'
class App extends React.Component {
  constructor(props)
  {
  	super(props);
  	this.state = {
  		isModal:false,
  		dataOk:false,
  		testData:{},
  		id:'',tz:'',selectedFile:null
  	}
  }

  onFileChange = event => { 
      this.setState({ selectedFile: event.target.files[0] }); 
    }; 

      onClear = () => { 
      document.getElementById("files").value=''
      this.setState({dataOk:false,testData:null})
    }; 

  onChange=(e)=>{  	
		this.setState({tz:e.target.checked?"checked":""})
  }

  onSubmit=()=>{
  	const formData = new FormData(); 
     
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 

      console.log(this.state.selectedFile)

  	axios.post("http://18.213.86.227:4000/advanced/fullthrottle/json", formData)
        .then((res) => {
  			this.setState({dataOk:res.data.ok, testData:res.data.members})  			  		          
        }).catch(error => {
          console.log(error);
        });
  }

  toggle=(id)=>{
  	this.setState({isModal:!this.state.isModal,id})
  }

  // componentDidMount() {
  // 	axios.get('http://18.213.86.227:4000/advanced/fullthrottle/json').then(res=>{
  // 		this.setState({dataOk:res.data.ok, testData:res.data.members})  			  		
  // 	}).catch(err=>{
  // 		console.log(err)
  // 	})
  // }

  render() {
  	let tableBody=[]
  	if(this.state.dataOk) {
	  for(let i in this.state.testData)  		
	  {
	  	tableBody.push(	  	  
	  	  <tr key={i}>
	  	  <td>{Number(i)+1}</td>
	  	  <td>{this.state.testData[i].id}</td>
	  	  <td><a href="#" onClick={()=>this.toggle(this.state.testData[i].id)}> {this.state.testData[i].real_name}</a></td>
	  	  <td>{this.state.testData[i].tz}</td>
	  	  </tr>	  	  
	  	)
	  }
  	}
  	let faPadding={padding:'10px'}
    let	view=(
  	  <>
  	  	<h1>Frontend Test - FullThrottle Labs</h1>
  	  	<div style={faPadding}>
  	  	<div className="row">
  	  	<div className="col-6">
  	  	<div className="text-left" style={faPadding}>
  	  	<input type="file" accept="json/*" id="files" name="selectedFile" onChange={this.onFileChange} /><Button size="sm" color="primary" onClick={this.onSubmit}>Submit</Button>{' '}<Button size="sm" color="secondary" onClick={this.onClear}>Clear</Button></div>
  	  	</div>
  	  	<div className="col-6">
  	  	<div className="text-right" style={faPadding}><input type="checkbox" checked={this.state.tz} name="tz" onChange={this.onChange} /> {' '}Timezone with Indian Standard Time</div>
  	  	</div>
  	  	</div>
  	  	
  	  	<Table bordered>
	  	  	<thead>
	        <tr>
	          <th>#</th>
	          <th>ID</th>
	          <th>Real Name</th>
	          <th>Time Zone</th>
	        </tr>
	      	</thead>
	      	<tbody> 
	      	{tableBody}      
      		</tbody>
  	  	</Table>
  	  	{this.state.dataOk?'':'No Record(s) Found'}
  	  	</div>
  	  	{this.state.isModal?<AppModal open={true} toggle={this.toggle} {...this.state} />:''}
  	  </>
  	)
  	return view;
  }
}

export default App;