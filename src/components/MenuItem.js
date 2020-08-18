import React from "react";
import {Link} from "react-router-dom";
class MenuItem extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        hover:false,
      }
    }
    
    handleHover(){
      this.setState({hover:!this.state.hover});
    }
    
    render(){
      const styles={
        container: {
          padding:'3rem 0',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          opacity: 0,
          animation: '1s appear forwards',
          animationDelay:this.props.delay,
        },
        menuItem:{
          fontFamily:`'Open Sans', sans-serif`,
          fontSize: '1.5rem',
          padding: '0.5rem 0 0 0',
          textDecoration:'none',
          margin: '0 5%',
          cursor: 'pointer',
          color: this.state.hover? '#4f8a8b':'#222831',
          transition: 'color 0.2s ease-in-out',
          animation: '0.5s slideIn forwards',
          animationDelay:this.props.delay,
        },
      }
    
      return(
        <div>
          <div style={styles.container}>
            <Link 
            style={styles.menuItem} 
            onMouseEnter={()=>{this.handleHover();}} 
            onMouseLeave={()=>{this.handleHover();}}
            onClick={() => this.props.onClick(this.props.children)}
            to={this.props.url}
            >
            {this.props.children}  
            </Link>
          </div> 
        </div>
        
      )
    }
  }
  export default MenuItem;