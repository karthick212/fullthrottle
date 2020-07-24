import React from 'react'
import moment from 'moment-timezone'
import { Modal, ModalHeader,ModalBody,ModalFooter,Button,Table } from 'reactstrap'

class AppModal extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			modalOpen: this.props.open,
			sDate: '',
			eDate: '',
			userData:[],
			filterData:[]
		}
	}

	dateChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

	filterbyDate=(isLoad)=> {
		let userData=this.props.testData.filter(m=>m.id===this.props.id)[0]
		let filterData=userData.activity_periods
		this.setState({userData})
		//if(!isLoad)
		let pushDate=[]
		for(let i in filterData) {
			let startDate=moment(filterData[i].start_time,'MMM D YYYY h:mma')._d
			let endDate=moment(filterData[i].end_time,'MMM D YYYY h:mma')._d

			let sDate1=new Date(new Date(this.state.sDate).toDateString())
			let eDate1=new Date(new Date(this.state.eDate).toDateString())
			
			if(startDate.getTime()>=sDate1.getTime()&&endDate.getTime()<=eDate1.getTime())
				pushDate.push(filterData[i])
		}
		if(isLoad) this.setState({filterData})
			else this.setState({filterData:pushDate})
		}

	componentDidMount()	{
		if(this.props.dataOk)
			this.filterbyDate(true);
	}

	render()
	{
		console.log(this.props)
		let tableBody=[]
		for(let i in this.state.filterData)
		{
			let startDate=moment(this.state.filterData[i].start_time,'MMM D YYYY h:mma')
			let endDate=moment(this.state.filterData[i].end_time,'MMM D YYYY h:mma')

			tableBody.push(
				<tr key={i}>
				<td>{1+Number(i)}</td>
				{this.props.tz!==''?
				(
					<>
					<td>{startDate.format('D MMM YYYY')}</td>
					<td>{startDate.format('h:mmA')}</td>
					<td>{endDate.format('h:mmA')}</td>	
					</>
				)
				:
				(
					<>
					<td>{startDate.tz(this.state.userData.tz).format('D MMM YYYY')}</td>
					<td>{startDate.tz(this.state.userData.tz).format('h:mmA')}</td>
					<td>{endDate.tz(this.state.userData.tz).format('h:mmA')}</td>	
					</>
				)}				
				</tr>	  	  
				)
		}
		let modal= (
			<div>
			<Modal isOpen={this.state.modalOpen}>
			<ModalHeader className="App">Activity Periods</ModalHeader>
			<ModalBody>
			<div className="row">      
			<div className="col-12 text-center">

			<p className="text-muted text-center">User ID : {this.state.userData.id}</p>
			<p className="text-muted text-center">User Name : {this.state.userData.real_name}</p>
			Date From: <input type="date" name="sDate" onChange={this.dateChange} />{'  '}
			Date To: <input type="date" name="eDate" onChange={this.dateChange} />{'  '}
			<Button color="primary" onClick={()=>this.filterbyDate(false)}>Go</Button>
			</div>
			<div className="col-12 text-center">
			<br />
			<Table bordered>
			<thead>
			<tr>
			<th>#</th>
			<th>Date</th>
			<th>Start Time</th>
			<th>End Time</th>
			</tr>
			</thead>
			<tbody> 
			{tableBody}      
			</tbody>
			</Table>
			</div>

			</div>
			</ModalBody>
			<ModalFooter>
			<Button color="secondary" onClick={this.props.toggle}>Close</Button>
			</ModalFooter>

			</Modal>
			</div>
			)

			return modal
		}

	}

	export default AppModal;