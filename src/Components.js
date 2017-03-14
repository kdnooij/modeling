import React, { Component } from 'react';
import './App.css';
import { Col, Navbar, Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';

export class NavBar extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Modeling - 0LEB0</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export class Input extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log("State of " + name + " changed to " + value);
        this.props.handleStateChange(name, value)
    }

    render() {
        return (
            <Col xs={12} md={4}>
                <FormGroup>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    {(this.props.prefix || this.props.suffix) && <InputGroup>
                        {this.props.prefix && <InputGroup.Addon>{this.props.prefix}</InputGroup.Addon>}
                        <FormControl data-lpignore="true" type="text" name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.handleInputChange} />
                        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
                        {this.props.suffix && <InputGroup.Addon>{this.props.suffix}</InputGroup.Addon>}
                    </InputGroup>}
                    {!(this.props.prefix || this.props.suffix) &&
                        <FormControl data-lpignore="true" type="text" name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.handleInputChange} />
                    }
                </FormGroup>
            </Col>
        );
    }
}

export class Output extends Component {
    render() {
        return (
            <Col xs={12} md={4}>
                <FormGroup>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <FormControl.Static id={this.props.name} > {this.props.value}</FormControl.Static>
                </FormGroup>
            </Col>
        );
    }
}

export class MainOutput extends Component {
    render() {
        return (
            <Col xs={12} md={12} className="MainOutput">
                <FormGroup className="form-group-lg">
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <FormControl.Static id={this.props.name} > {this.props.value}</FormControl.Static>
                </FormGroup>
            </Col>
        );
    }
}

export function Header() {
    return (
        <Jumbotron>
            <div className="container">
                <h1>
                    Rolstoel optimalisatie op vliegvelden
            </h1>
                <p>
                    Interactief model gemaakt door Koen de Nooij, Joost Roordink,<br /> David Tuin, Ruben Verhaegh en Thomas Willems.
            </p>
            </div>
        </ Jumbotron>
    );
}