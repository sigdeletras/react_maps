import React from 'react';
import MapView from './components/MapView/MapView.js'
import SelectList from './components/SelectList/SelectList.js';

import './App.css';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      coordCenter: [37.885963680860755, -4.774589538574219],
      munipalityName: '',
      zoom: 9,
    }
    this.munipalityChange = this.munipalityChange.bind(this)
  }

  munipalityChange = (data) => {
    let aData = data.split(',')
    this.setState({
      coordCenter: [aData[0], aData[1]],
      munipalityName: aData[2],
      zoom: 14,
    });
  }


  render() {
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
            <MapView coordCenter={this.state.coordCenter} zoom={this.state.zoom} />
          </div>
        </div>

        {/* Table */}
        <div className="row m-3">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Type 1</td>
                  <td>Álvaro</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Type 2</td>
                  <td>name 2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Type 1</td>
                  <td>name 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
