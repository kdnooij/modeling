import React, { Component } from 'react';
import './App.css';
import { Row, Col, Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Input, NavBar, Header, Output, MainOutput } from './Components.js';
import { LineChart, Line, XAxis, YAxis } from 'recharts';


class Graph extends Component {
    render() {
        return (
            <LineChart width={this.props.width} height={this.props.height} data={this.props.data}>
                <Line type="linear" dataKey="value" stroke="#2780E3" dot={false} />
                <XAxis type="number" interval={"preserveStartEnd"} dataKey="n" />
                <YAxis />
            </LineChart>
        )
    }
}

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
            'rolstoelDraagkracht': 10,
            'property': 'reizigers',
            'start': 0,
            'stop': 1,
            'graphWidth': 500
        }
        this.handleStateChange = this.handleStateChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(x, y, z) {
        this.setState({graphWidth:document.getElementById('graph-panel').offsetWidth});
    }
    
    handleStateChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    handleChange(event) {
        this.setState({ property: event.target.value });
    }

    render() {
        return (
            <div className="Modeling">
                <NavBar />
                <Header />
                <div className="container">
                    <Panel id="graph-panel">
                        <Row>
                            <Col md={4} xs={12}>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Plot </ControlLabel>
                                    <FormControl componentClass="select" placeholder="select" value={this.state.property} onChange={this.handleChange}>
                                        <option value="reizigers">Aantal reizigers</option>
                                        <option value="benodigdenRatio">Gedeelte benodigden van reizigers</option>
                                        <option value="escorteUurloon">Uurloon escorte</option>
                                        <option value="bewakerUurloon">Uurloon bewaker</option>
                                        <option value="monteurUurloon">Uurloon monteur</option>
                                        <option value="escorteLoopsnelheid">Loopsnelheid escortes</option>
                                        <option value="gemiddeldeAfstand">(Gewogen) gemiddelde afstand tussen gates</option>
                                        <option value="bewakers">Aantal bewakers</option>
                                        <option value="monteurs">Aantal monteurs</option>
                                        <option value="rolstoelAanschafprijs">Aanschafkosten rolstoel</option>
                                        <option value="rolstoelLevensduur">Levensduur rolstoel</option>
                                        <option value="rolstoelOnderhoudskosten">Onderhoudskosten rolstoel (materiaal)</option>
                                        <option value="rolstoelDraagkracht">Rolstoeldraagkracht</option>
                                        <option value="rolstoelRuimte">Benodigde opslagruimte per rolstoel</option>
                                        <option value="opslagprijs">Opslagprijs</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Input
                                label="Start"
                                name="start"
                                value={this.state.start}
                                handleStateChange={this.handleStateChange}
                            />
                            <Input
                                label="Stop"
                                name="stop"
                                value={this.state.stop}
                                handleStateChange={this.handleStateChange}
                            />
                        </Row>

                        <Graph width={this.state.graphWidth-50} height={this.state.graphWidth * 9/16} data={this.getGraph(parseFloat(this.state.start) ? parseFloat(this.state.start) : 0,
                            parseFloat(this.state.stop) && !(parseFloat(this.state.stop) - parseFloat(this.state.start) < 0.01) ? parseFloat(this.state.stop) : parseFloat(this.state.start) + 0.01, 500, this.state.property)} />
                    </Panel>

                    <Row>
                        <MainOutput
                            label="Totale kosten"
                            name="totaleKosten"
                            value={"€" + this.getTotaleKosten(this.state) + " / uur"}
                        />
                        <Output
                            label="Personeelskosten"
                            name="personeelskosten"
                            value={"€" + this.getPersoneelskosten(this.state) + " / uur"}
                        />
                        <Output
                            label="Rolstoelskosten"
                            name="rolstoelkosten"
                            value={"€" + this.getRolstoelkosten(this.state) + " / uur"}
                        />
                        <Output
                            label="Opslagkosten"
                            name="opslagkosten"
                            value={"€" + this.getOpslagkosten(this.state) + " / uur"}
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
                            value={this.getEscortes(this.state)}
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
                            value={this.getRolstoelen(this.state)}
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

            </div >
        );
    }

    getGraph(start, end, steps, property) {
        //var original = this.state[property];
        var dataset = JSON.parse(JSON.stringify(this.state));
        var data = [];
        var step = 0;
        for (var i = start; i <= end; i += (end - start) / steps) {
            dataset[property] = i;
            //console.log(dataset);
            //console.log("value: " + this.getTotaleKosten(dataset));
            data[step] = { n: i, value: this.getTotaleKosten(dataset) };
            step++;
        }
        //dataset[property] = original;
        return data
    }

    getTotaleKosten(dataset) {
        return Number((this.getPersoneelskosten(dataset) + this.getRolstoelkosten(dataset)).toFixed(2));
    }

    getPersoneelskosten(dataset) {
        return Number((dataset.bewakers * dataset.bewakerUurloon + this.getEscortes(dataset) *
            dataset.escorteUurloon + dataset.monteurs * dataset.monteurUurloon).toFixed(2));
    }

    getRolstoelkosten(dataset) {
        return Number((this.getRolstoelen(dataset) * dataset.rolstoelAanschafprijs / dataset.rolstoelLevensduur + this.getOpslagkosten(dataset)).toFixed(2));
    }

    getOpslagkosten(dataset) {
        return Number((dataset.opslagprijs * this.getRolstoelen(dataset) * dataset.rolstoelRuimte).toFixed(2));
    }

    getEscortes(dataset) {
        return Math.ceil(dataset.gemiddeldeAfstand * this.getBenodigden(dataset) / dataset.escorteLoopsnelheid);
    }

    getRolstoelen(dataset) {
        return Math.ceil(this.getEscortes(dataset) * 1.10, 10);
    }

    getBenodigden(dataset) {
        return Math.round(dataset.reizigers * dataset.benodigdenRatio)
    }
}

export default App;
