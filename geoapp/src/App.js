import React from 'react';
import MapView from './components/MapView/MapView'
import SelectList from './components/SelectList/SelectList';
import TableList from './components/TableList/TableList'

import './App.css';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      coordCenter: [37.885963680860755, -4.774589538574219],
      munipalityName: '',
      zoom: 9,
      geodata: [],
      code: ''
    }
    this.munipalityChange = this.munipalityChange.bind(this)
  }

  async getWFSData(code) {
    const URL = `http://www.ideandalucia.es/dea100/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=dea100:sv03_sas&MAXFEATURES=10&outputFormat=application/json&filter=<Filter><PropertyIsEqualTo><PropertyName>codmun</PropertyName><Literal>${code}</Literal></PropertyIsEqualTo></Filter>&SRSNAME=EPSG:4326`
    const res = await fetch(URL)
    const data = await res.json();
    this.setState({
      geodata: data
    })
  }

  munipalityChange = (data) => {
    let aData = data.split(',')
    this.setState({
      coordCenter: [aData[0], aData[1]],
      munipalityName: aData[2],
      zoom: 14,
      code: aData[3]
    });
    this.getWFSData(aData[3])
  }

  render() {

    const mystyle = {
      height: "230px",
      overflow: "auto",
    };

    return (
      <div className="container-fluid">
        {/* Title */}
        <div className="row m-3">
          <div className="col-12">
            <h1 className="text-center">GeoApp</h1>
          </div>
        </div>

        <div className="row m-3">
          <div className="col-sm-4 col-md-2">
            {/* Select */}
            <div className="form-group">
              <SelectList munipalityChange={this.munipalityChange} />
            </div>
          </div>
          {/* Map */}

          <div className="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3">
            <MapView coordCenter={this.state.coordCenter}
              zoom={this.state.zoom}
              geodata={this.state.geodata}
              code={this.state.code}>
            </MapView>
          </div>
        </div>

        {/* Table */}
        <div  style = {mystyle} className="row m-3">
          <div  className="col">
            <TableList data={this.state.geodata} />
          </div>
        </div>

      </div>
    )
  }
}
