import React from 'react';

import CardView from 'react-native-rn-cardview';
const moment = require('moment');


import { View, Text, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';

export default class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD"),
      data : null,
      success: false,
      active: false,
      id: null,
      sun: null,
      mon: null,
      tue: null,
      wed:null,
      thu:null,
      fri: null,
      sat:null,
      selected:false,
      all:null,
      index:null
      
      


    }
  }

  onSelectCard = async () => {

  }

  onShowCard = async () => {
    
  }


  

  onGetData = async () => {
    await fetch('https://ulo.life/api/timeslots?provider_id=7c8ea264-2cd3-4e5b-8f40-46a1a6fda174&sort_by=created_at&order=asc&app_version=1.10.0')
    .then((response) => response.json())
    .then((responseJson) => {
      
      this.setState({
        data : responseJson,
        success: true,
      })
      
    })
    .catch((error) => {
      console.error(error);
    });
  }

  showData = async () => {
    let sun = [];
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let all = [];
    await this.state.data.data.map((item) => {
          
          switch(item.day_of_week.toString()){
            case "1": 
                
                if(item.active===1){
                  sun.push(item);
                }
                break;
            case "2":
              
                if(item.active===1){
                  mon.push(item);
                }
                break;
            case "3":
              
                if(item.active===1){
                  tue.push(item);
                }
                break;
            case "4":
              
                if(item.active===1){
                  wed.push(item);
                }
                break;
            case "5": 
            
                
                if(item.active===1){
                  thu.push(item);
                }
                break;
            case "6":
              
                
                if(item.active===1){
                  fri.push(item);
                }
                break;
            case "7":
              
                if(item.active===1){
                  sat.push(item);
                }
                break;

          }
    });

    // await all.push({
    //   sun:sun,
    //   mon:mon,
    //   tue:tue,
    //   wed: wed,
    //   thu: thu,
    //   fri: fri,
    //   sat:sat
    //  });

    
    this.setState({
        sun: sun,
        mon: mon,
        tue:tue,
        wed:wed,
        thu:thu,
        fri:fri,
        sat:sat,
        
    })
  }

  async componentDidMount(){
      

      await this.onGetData();
      await this.showData();
      this.selectDeals(new Date().getDay()+1, 0);
      
      
      

    

  }

  selectDeals = async (value, index) => {
     switch(value){
       case 1:
          /*check whether the data is empty or not, 
          if empty then move to next deal until there is data found, 
          not really recursive */
          if(this.state.sun.length>0){
            this.setState({
              all:this.state.sun,
              selected:true,
              index:index
            });
          }else{
            this.selectDeals(value+1, index);
          }
          
          
          break;
       case 2: 
          if(this.state.mon.length>0){
            this.setState({
              all:this.state.mon,
              selected:true,
              index:index
            });
          }else{
            this.selectDeals(value+1, index);
          }
          
          break;
       case 3: 
          if(this.state.tue.length>0){
            this.setState({
              all:this.state.tue,
              selected:true,
              index:index
            });
          }else{
            this.selectDeals(value+1, index);
          }
          
          break;
      case 4:
          if(this.state.wed.length>0){
            this.setState({
              all:this.state.wed,
              selected:true,
              index:index
            });
          }else{
            this.selectDeals(value+1,index);
          }
          
          break;
      case 5:
          if(this.state.thu.length>0){
            this.setState({
              all:this.state.thu,
              selected:true,
              index:index
            }); 
          }else{
            this.selectDeals(value+1, index);
          }
          
          break;
      case 6:
          if(this.state.fri.length>0){
            this.setState({
              all:this.state.fri,
              selected:true,
              index:index
            });
          }else{
            this.selectDeals(value+1, index);
          }
          
          break;
      case 7:
          if(this.state.sat.length>0){
            this.setState({
              all:this.state.sat,
              selected:true,
              index:index
            });
          }else{
            this.selectDeals(1, index);
          }
          
          break;
      
        
     }
  };

  render() {


    const deals = 
              <View style={{flex:1, height:200, marginTop:0, paddingRight:0, paddingLeft:0, paddingTop:0, paddingBottom:0, backgroundColor:'#F9F9F9'}}>
                 <View style={{paddingRight:0, paddingLeft:25, paddingTop:0, paddingBottom:0}}>
                 <FlatList
                horizontal={true}
                style={{flexGrow:0}}
                data={this.state.all}
                renderItem={({item, index, separators}) => 
                {
                
                return (
                  
                
                // <Text>{item.id}</Text>
                <TouchableOpacity
                onPress={() => {
                this.setState({
                active: true,
                id: index
                })
                }}
                style={{height:100}}
              >
              <View style={{flex:1,marginTop: 0, height:80, alignItems:'center', justifyContent:'center'}}>
                <CardView cardElevation={5}
                maxCardElevation={5}
                radius={10}
                
                backgroundColor={'#FFFFFF'}>
                <View style={ (this.state.active && this.state.id === index) ?  {width:103, height:60, backgroundColor:'#FB4D63', alignItems:'center', justifyContent:'center'} : {width:103, height:60, alignItems:'center', justifyContent:'center'}}>
                  <View style={{alignItems:'center', justifyContent:'center', marginRight:20, marginBottom:15}}>
                    <Text style={(this.state.active && this.state.id === index ? {marginTop:15, fontSize:10,color:'white'}:{marginTop:15, fontSize:10,color:'#FB4D64'})}>{item.start_time}pm</Text>
                    <Text style={(this.state.active && this.state.id === index ? { fontSize:17, color:'white'}:{ fontSize:17,color:'#FB4D64'})}>{item.discount}%</Text>
                  </View>
                 
                    
                  
                </View>
                </CardView>
              </View>
              </TouchableOpacity>

              )
              }
              }
              />
  
                </View>           
              
          </View> ;

    
    
    let dates = [];
    let date = new Date();
    let days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    let months = ['JAN','FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DES'];

    for (let i = 0; i <= 14; i++){
      let tempDate = new Date();
      tempDate.setDate(date.getDate()+i);
      let str = days[tempDate.getDay()]+ "/" + pad(tempDate.getDate()) + "/" + months[tempDate.getMonth()] + "/" + ( 1 + tempDate.getDay())  ;
      // str.split("/");
      dates.push(str.split("/"));  
    }
    // console.log("DATES", dates);
    // console.log("SPLIT ", dates[0].split("/"));

    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }
    // console.log("THIS STATE DATA", this.state.data);
    let today = this.state.currentDate;
    
    
    return (
      
      <View style={{flex:4}}>
        <Text style={{fontSize:22, fontWeight:'bold', marginBottom:0, paddingRight:0, paddingLeft:28, paddingTop:20, paddingBottom:3}}>Daily Deals</Text>
        
        {this.state.success === true && this.state.data !=null && this.state.data.data.length > 0 && (
          
                <View style={{flex:1}}>
  
                <View style={{paddingRight:0, paddingLeft:25, paddingTop:0, paddingBottom:0}}>
                <FlatList
                horizontal={true}
                data={dates}
                style={{height:65, flexGrow:0}}
                renderItem={({item, index, separators}) => 
                {
                  
                
                return (
                // <Text>{item.id}</Text>
                
                  <TouchableOpacity
                    onPress={() => {
                    // let lists = [];
                      switch(item[3]){
                    //if it is sunday 
                        case "1": 
                            this.selectDeals(1, index)
                            break;
                        case "2": 
                            this.selectDeals(2, index);
                            break;
                        case "3":
                            this.selectDeals(3, index);
                            break;
                        case "4":
                            this.selectDeals(4, index);
                            break;
                        case "5":
                            this.selectDeals(5, index);
                            break;
                        case "6":
                            this.selectDeals(6, index);
                            break;
                        case "7":
                            this.selectDeals(7, index);
                            break;
                        default:
                            
                            break;
                      }
                    }}
                    style={{ height:70, marginLeft:0}}
                >
                
                <CardView cardElevation={4}
                    maxCardElevation={4}
                    radius={7}
                    backgroundColor={'#F4F4F4'}>
                <View style={{ backgroundColor:'#F2F2F2', paddingLeft:10, paddingTop:5, width:52, height:55, borderRightWidth:1, borderStyle:'solid', borderRightColor:'red', borderRadius:2}}>
                  
                    <Text style={this.state.selected && this.state.index === index ? {fontSize:7,color:'#FB4D64'}: {fontSize:7,color:'black'}}>{item[0]}</Text>
                    <Text style={this.state.selected && this.state.index === index ? {color:'#FB4D64', fontSize:17, fontWeight:'bold'}: {color:'black', fontSize:17, fontWeight:'bold'}}>{item[1]}</Text>
                    <Text style={this.state.selected && this.state.index === index ? {fontSize:9, color:'#FB4D64'}: {fontSize:9, color:'black'}}>{item[2]}</Text>
                     
                  
                
                </View>
                </CardView>
                
                </TouchableOpacity>
                

                )
                }
                }
                />
                </View>

                {deals}

                
                </View>
                )}


        

      </View>
    );
  }
}