import * as React from 'react';
import EventEmitter from "react-native-eventemitter"; 
import _ from 'lodash';
import { SelectionState } from '@devexpress/dx-react-grid';
import classnames from 'classnames';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
   PagingPanel,
    TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import axios from 'axios';
import { Container,Alert,Nav,NavItem,FormGroup,Label, Badge,Row,Col,Card,CardHeader,FormText,CardBlock,Button,Modal, ModalHeader, ModalBody, ModalFooter,Input, InputGroup, InputGroupAddon } from "reactstrap";

const getRowId = row => row.id;
export default class MM extends  React.PureComponent{
    constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      displayTable:false,
      displayAdvanceNoticeTable:false,
      dropData:[
           {
             "plant":"test",
             "sloc":"test1"


           },
           {
                "plant":"test1",
                "sloc":"test2"
           },
           {
                "plant":"test1",
                "sloc":"test2"
           }
           ],
        columns: [
     { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car124377865764587657645675' },
        { name: 'car1', title: 'Car1' },
        { name: 'car44', title: 'car24' },
        { name: 'car3', title: 'Car3' },
        { name: 'car4', title: 'Car4' },
        { name: 'car5', title: 'Car5' },
        { name: 'car6', title: 'Car6' },
        { name: 'car7', title: 'Car7' },
        { name: 'car8', title: 'Car8' },
        { name: 'car9', title: 'Car9' },
        { name: 'car10', title: 'Car10' },
        { name: 'car11', title: 'Car11' },
        { name: 'car12', title: 'Car12' },        
        { name: 'car13', title: 'Car13' },
        { name: 'car14', title: 'Car14' },
        { name: 'car15', title: 'Car15' },
      
      ],
       tableColumnExtensions: [
        { columnName: 'car', width: 300  },
      ],
      rows:[  { 'id':1,
         'name':'laptiop',
         'sex':'M',
         'city':'vij',
         'car':'gdfdfgfhfhfgfghffgfghfghfghfghTime)'
      },
     {
         'id':2,
         'name':'laptiop',
         'sex':'M',
         'city':'vij',
         'car':'car456'
      },
      {
         'id':3,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      },
      {
         'id':4,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      },
      {
         'id':5,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      },
      {
         'id':6,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      }
],
selection: [],
    };
   this.mm={
       market:'',
       sloc:'',
       plant:''
   }
   this.adavanceShipNotice =[];
   this.goodReceipe =[]
    this.plant=[];
    this.sloc=[];
    this.handleChange = this.handleChange.bind(this);
    this.showTables = this.showTables.bind(this);
   
    //this.saveAsDefault = this.saveAsDefault.bind(this);
   // this.getSlocAndPlantInfo = this.getSlocAndPlantInfo.bind(this);
     
  }
 
 handleChange(event){
     this.mm[event.target.name] = event.target.value;
     if(this.mm.market!=''){
           this.getSlocAndPlantInfo();

      }
     this.setState(this.mm);
    EventEmitter.emit("mmvalue",this.mm);
 }
  
  getSlocAndPlantInfo = () => {
        document.getElementById("loader").style.display = 'block';
       axios.get("https://jsonplaceholder.typicode.com/posts?userId=1").then((response) => {
           console.log(response);
         let array=[],array1=[],removeDuplicateValues=[];
       _.forEach(this.state.dropData,function(data){
           console.log(data);
           array.push({"plant":data.plant});
           array1.push({"sloc":data.sloc});
       })
//*** new code 

 var arrayOfObjAfter = _.map(
    _.uniq(
        _.map(array, function(obj){
            return JSON.stringify(obj);
        })
    ), function(obj) {
        return JSON.parse(obj);
    }
);
       document.getElementById("loader").style.display = 'none'; 
       this.plant = arrayOfObjAfter; ///up to here
       this.sloc =array1;
       this.setState(this.plant);
       this.setState(this.sloc);
        
        })           
   }
 changeSelection = selection => {
       let selection1=null,selection2=[];
      if(selection.length>1){
         selection1 = selection[selection.length-1]  
          selection2.push(selection1);
          selection = selection2; 
      }
     this.setState({ selection});
 }
 showTables(event){
   event.preventDefault();
   if(this.mm.market!='' || this.mm.sloc!=''){
       this.data = {};
       this.data.plant = this.mm.plant;
       this.data.sloc = this.mm.sloc; 
       this.displayTableData();
   }
 }
 displayTableData = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts?userId=1").then((response) => {
     document.getElementById("loader").style.display = 'block';
        console.log(response);
        this.goodReceipe = response.data;
         this.setState(this.goodReceipe);
          axios.get("https://jsonplaceholder.typicode.com/posts?userId=1").then((response) => {
                 console.log(response);
               this.adavanceShipNotice =response.data;
               this.setState(this.adavanceShipNotice);
               console.log(this.adavanceShipNotice);
           this.setState({
               displayTable:true
           })
             this.setState({
               displayAdvanceNoticeTable:true
           })
     document.getElementById("loader").style.display = 'none'; 

          })
    });
 }
  render() {
       const { rows, columns,tableColumnExtensions,selection } = this.state;
    return (
  <div className="disburse_width mm_bottom"> 
                    <Row className="test">
                       <Col md="2">
                           <Label for="exampleEmail" >Market :</Label>
                        </Col> 
                        <Col md="4">
                            <InputGroup>
                            <Input type="select" className="w-100" value={this.mm.market} name="market" onChange={this.handleChange} id="ccmonth">
                               <option value="">Select </option>
                               <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="12">12</option>
                            </Input>
                            
                            </InputGroup>
                        </Col>     
                        <span id="passwordLengthErr" className="colorvalidation"> </span>
                        <Col md="2">
                            <Button color="primary" style={{backgroundColor: '#a70606', borderColor: '#a70606'}} onClick={this.saveAsDefault}  >Save as Default</Button>
                        </Col> 
                    </Row>
                   <Row className="test">
                       <Col md="2">
                           <Label for="exampleEmail" >Plant :</Label>
                        </Col> 
                        <Col md="4">
                            <InputGroup>
                            <Input type="select" className="w-100" value={this.mm.plant} name="plant" onChange={this.handleChange} id="ccmonth1">
                              <option value="">Please Select </option>
                              {this.plant.map((item,index) =>( <option key={index} value={item.plant}>{item.plant}</option> ))}
                            </Input>
                            
                            </InputGroup>
                        </Col>


                   </Row>
                    <Row>
                       <Col md="2">
                           <Label for="exampleEmail" className="pt-1">Sloc :</Label>
                        </Col> 
                        <Col md="4">
                            <InputGroup>
                            <Input type="select" className="w-100" value={this.mm.sloc} name="sloc" onChange={this.handleChange} id="ccmonth">
                                <option value="">Please Select </option>
                              {this.sloc.map((item,index) =>( <option key={index} value={item.sloc}>{item.sloc}</option> ))}
                            </Input>
                            
                            </InputGroup>
                        </Col>     
                        <span id="passwordLengthErr" className="colorvalidation"> </span>
                        <Col md="2">
                                <Button  color="primary" style={{backgroundColor: '#a70606', borderColor: '#a70606'}}  className="save_button" onClick={this.showTables}>Save</Button>
                            
                        </Col> 
                    </Row>

                  {this.state.displayTable? <div>

                    <p className="test"  style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b> List  of Disbursements</b> </p>
                     <div className="row pb-4 px-5">
                            <div  className="col-12 grid-table">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
           <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <PagingState
            defaultCurrentPage={0}
            pageSize={5}
          />
          <IntegratedPaging />
          <Table   columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
           <TableSelection
            selectByRowClick
          />
          <PagingPanel />
        </Grid>
      </div>
      </div>                         

         <p className="test" style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b>Goods Receipt</b> </p>
         <div className="row pb-4 px-5">
                             <div className="col-12 grid-table">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={5}
          />
          <IntegratedPaging />
          <Table />
          <TableHeaderRow/>
          <PagingPanel />
        </Grid>
      </div>
       </div>               { this.state.displayAdvanceNoticeTable ?<div>
                                 <p className="test" style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b>Adavnce Ship Notice</b> </p>
         
        <div className="row pb-4 px-5">
                              <div className="col-12 grid-table">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <PagingState
            defaultCurrentPage={0}
            pageSize={5}
          />
          <IntegratedPaging />
          <Table />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
      </div>
     </div>
                         </div>:''} </div>:''}


  </div>
    );
  }
}