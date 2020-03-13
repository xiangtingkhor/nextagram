import React, {useState} from 'react';
import  {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    InputGroup, 
    InputGroupAddon, 
    Button, 
    Input
    
  } from 'reactstrap';
  import {Link} from "react-router-dom";
  import ModalForm from './ModalForm';
  import MyProfilePage from '../page/MyProfilePage';



const Navibar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
<Navbar color="light" light expand="md">

<Link to="/homepage">
  <div>
  <img src="https://insta.nextacademy.com/static/favicon.png" width="30" height="30"/>
  </div>
 </Link>

 <Link to="/homepage">
<NavbarBrand href="/">Nextagram</NavbarBrand>
</Link>

<NavbarToggler onClick={toggle} />
<Collapse isOpen={isOpen} navbar>
<Nav className="mr-auto" navbar>


<NavItem>

<Link to="/myprofile">
<NavLink>
My Profile
</NavLink>
</Link>

<NavLink>
 <ModalForm/> 
</NavLink>

</NavItem>

</Nav>

<InputGroup>
        <Input />
        <div className='input' >
        <InputGroupAddon addonType="append">
          <Button color="secondary">Search</Button>
        </InputGroupAddon>
        </div>
      </InputGroup>

</Collapse>
</Navbar>

        </div>
    )

}


export default Navibar;