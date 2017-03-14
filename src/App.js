import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import { Input, NavBar, Header, Output, MainOutput } from './Components.js';


class App extends Component {
    constructor() {
        super();
        this.state = {
            'bewakers': 3,
            'bewakerUurloon': 20,
            'escorteUurloon': 20,
            'monteurs': 3,
            'monteurUurloon': 20,
            'rolstoelAanschafprijs': 800,
            'rolstoelLevensduur': 24 * 365 * 3,
            'opslagprijs': 10,
            'rolstoelRuimte': 1,
            'gemiddeldeAfstand': 100,
            'benodigdenRatio': 0.07,
            'escorteLoopsnelheid': 5 * 1000,
            'reizigers': 1000,
            'rolstoelOnderhoudskosten': 0.3,
            'rolstoelDraagkracht': 10
        }
        this.handleStateChange = this.handleStateChange.bind(this)
    }

    handleStateChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="Modeling">
                <NavBar />
                <Header />
                <div className="container">
                    <Row>
                        <MainOutput
                            label="Totale kosten"
                            name="totaleKosten"
                            value={"€" + this.getTotaleKosten() + " / uur"}
                        />
                        <Output
                            label="Personeelskosten"
                            name="personeelskosten"
                            value={"€" + this.getPersoneelskosten() + " / uur"}
                        />
                        <Output
                            label="Rolstoelskosten"
                            name="rolstoelkosten"
                            value={"€" + this.getRolstoelkosten() + " / uur"}
                        />
                        <Output
                            label="Opslagkosten"
                            name="opslagkosten"
                            value={"€" + this.getOpslagkosten() + " / uur"}
                        />
                    </Row>
                    <hr />
                    <Row>
                        <Input
                            label="Aantal reizigers"
                            name="reizigers"
                            value={this.state.reizigers}
                            suffix="/ uur"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Gedeelte benodigden van reizigers"
                            name="benodigdenRatio"
                            value={this.state.benodigdenRatio}
                            suffix="0-1"
                            handleStateChange={this.handleStateChange}
                        />
                    </Row>
                    <hr />
                    <Row>
                        <Input
                            label="Uurloon escorte"
                            name="escorteUurloon"
                            value={this.state.escorteUurloon}
                            suffix="&euro; / (escorte uur)"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Uurloon bewaker"
                            name="bewakerUurloon"
                            value={this.state.bewakerUurloon}
                            suffix="&euro; / (bewaker uur)"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Uurloon monteur"
                            name="monteurUurloon"
                            value={this.state.monteurUurloon}
                            suffix="&euro; / (monteur uur)"
                            handleStateChange={this.handleStateChange}
                        />
                    </Row>
                    <hr />
                    <Row>
                        <Input
                            label="Loopsnelheid escortes"
                            name="escorteLoopsnelheid"
                            value={this.state.escorteLoopsnelheid}
                            suffix="m / uur"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="(Gewogen) gemiddelde afstand tussen gates"
                            name="gemiddeldeAfstand"
                            value={this.state.gemiddeldeAfstand}
                            suffix="m"
                            handleStateChange={this.handleStateChange}
                        />
                    </Row>
                    <hr />
                    <Row>
                        <Output
                            label="Aantal escortes"
                            name="escortes"
                            value={this.getEscortes()}
                        />
                        <Input
                            label="Aantal bewakers"
                            name="bewakers"
                            value={this.state.bewakers}
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Aantal monteurs"
                            name="monteurs"
                            value={this.state.monteurs}
                            handleStateChange={this.handleStateChange}
                        />
                    </Row>
                    <hr />
                    <Row>
                        <Output
                            label="Aantal rolstoelen"
                            name="rolstoelen"
                            value={this.getRolstoelen()}
                        />
                        <Input
                            label="Aanschafkosten rolstoel"
                            name="rolstoelAanschafprijs"
                            value={this.state.rolstoelAanschafprijs}
                            suffix="&euro; / rolstoel"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Levensduur rolstoel"
                            name="rolstoelLevensduur"
                            value={this.state.rolstoelLevensduur}
                            suffix="uur"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Onderhoudskosten rolstoel (materiaal)"
                            name="rolstoelOnderhoudskosten"
                            value={this.state.rolstoelOnderhoudskosten}
                            suffix="&euro; / (rolstoel uur)"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Rolstoeldraagkracht"
                            name="rolstoelDraagkracht"
                            value={this.state.rolstoelDraagkracht}
                            suffix="rolstoel / monteur"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Benodigde opslagruimte per rolstoel"
                            name="rolstoelRuimte"
                            value={this.state.rolstoelRuimte}
                            suffix="m² / rolstoel"
                            handleStateChange={this.handleStateChange}
                        />
                        <Input
                            label="Opslagprijs"
                            name="opslagprijs"
                            value={this.state.opslagprijs}
                            suffix="&euro; / m²"
                            handleStateChange={this.handleStateChange}
                        />
                    </Row>
                </div>
            </div>

        );
    }

    getTotaleKosten() {
        return Number((this.getPersoneelskosten() + this.getRolstoelkosten()).toFixed(2));
    }

    getPersoneelskosten() {
        return Number((this.state.bewakers * this.state.bewakerUurloon + this.getEscortes() *
            this.state.escorteUurloon + this.state.monteurs * this.state.monteurUurloon).toFixed(2));
    }

    getRolstoelkosten() {
        return Number((this.getRolstoelen() * this.state.rolstoelAanschafprijs / this.state.rolstoelLevensduur + this.getOpslagkosten()).toFixed(2));
    }

    getOpslagkosten() {
        return Number((this.state.opslagprijs * this.getRolstoelen() * this.state.rolstoelRuimte).toFixed(2));
    }

    getEscortes() {
        return Math.round(this.state.gemiddeldeAfstand * this.getBenodigden() / this.state.escorteLoopsnelheid);
    }

    getRolstoelen() {
        return Math.round(this.getEscortes() * 1.10, 10);
    }

    getBenodigden() {
        return Math.round(this.state.reizigers * this.state.benodigdenRatio)
    }
}

export default App;
