import React from 'react';

import MapView from './components/MapView/MapView.js'

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row m-3">
          <div className="col-12">
            <h1 className="text-center">GeoApp</h1>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-4 col-md-2">

            <div className="form-group">
              <label>Municipality</label>
              <select className="form-control">
                <option>Montoro</option>
                <option>Lucena</option>

              </select>
            </div>
            <button className="btn btn-primary mb-3">Load</button>
          </div>
          <div className="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3">
          <MapView/>
          </div>
        </div>
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
export default App;
