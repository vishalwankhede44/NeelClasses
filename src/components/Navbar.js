import React  from "react";
import Menu from './Menu';
import MenuItem  from './MenuItem';
import MenuButton from './MenuButton';
import "../App.css";

class Navbar extends React.Component {
    constructor(props){
      super(props);
      this.state={
        menuOpen:false,
      }
    }
    
    handleMenuClick() {
      this.setState({menuOpen:!this.state.menuOpen});
    }
    
    handleLinkClick() {
      this.setState({menuOpen: false});
    }

    render(){
      const menu = ['About','Our Products','Services','FAQ','Contact Us']
      const menuItems = menu.map((val,index)=>{
        return (
          <MenuItem 
            key={index} 
            delay={`${index * 0.2}s`}
            onClick={()=>{this.handleLinkClick();}}>{val}</MenuItem>)
      });


    
      return(
        <div>
            <div className="nav-container">
                <div className="nav-brand">
                  <h1>Neels</h1>
                </div>
                <div className="menu">
                    <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='#222831'/>
                </div>
            </div>
            <Menu open={this.state.menuOpen}>
                {menuItems}
            </Menu>
        </div>
      )
    }
  }
  export default Navbar;