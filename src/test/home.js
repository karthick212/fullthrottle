import React from 'react'
import AppModal from './modal'
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap'
import json from '../Test JSON.json'

class App extends React.Component {
  constructor(props)
  {
  	super(props);
  	this.state = {
  		isModal:false,
  		dataOk:false,
  		testData:{},
  		id:'',tz:''
  	}
  }

  onChange=(e)=>{  	
		this.setState({tz:e.target.checked?"checked":""})
  }

  toggle=(id)=>{
  	this.setState({isModal:!this.state.isModal,id})
  }

  componentDidMount() {
  		this.setState({dataOk:json.ok, testData:json.members})  	
  }

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
  	  	<div className="text-right" style={faPadding}><input type="checkbox" checked={this.state.tz} name="tz" onChange={this.onChange} /> {' '}Timezone with Indian Standard Time</div>
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
  	  	</div>
  	  	{this.state.isModal?<AppModal open={true} toggle={this.toggle} {...this.state} />:''}
  	  </>
  	)
  	return view;
  }
}

export default App;