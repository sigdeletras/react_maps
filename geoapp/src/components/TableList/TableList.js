import React, { Component } from "react";
import PubSub from "pubsub-js";
// import  './TableList.css';

const TableHeader = (props) => {
  if (props) {
    let features = props.features;
    if (features) {
      let rowName = "";
      features.map((f) => {
        rowName = Object.keys(f.properties);
      });

      return (
        <thead>
          <tr>
            <th> </th>
            {rowName.map((th) => (
              <th> {th.toUpperCase()} </th>
            ))}
          </tr>
        </thead>
      );
    }
  }
};

const TableRows = (props) => {
  if (props) {
    let features = props.features;
    if (features) {
      let row = "";
      features.map((f) => {
        row = Object.values(f.properties);
      });

      return (
        <tbody>
          {features &&
            features.map((f) => (
              <tr key={f.id}>
                <td>
                  <ButtonZoom coor={f.geometry.coordinates} />
                </td>
                {row.map((td) => (
                  <td> {td} </td>
                ))}
              </tr>
            ))}
        </tbody>
      );
    }
  }
};

class ButtonZoom extends Component {
  zoomFeatrue = () => {
    PubSub.publish("zoomFromTableRow", this.props.coor);
  };
  render() {
    return (
      <button
        ref={this.leafletRef}
        className="btn btn-primary"
        onClick={this.zoomFeatrue}>
        <i class="icon-zoom-in"> </i>
      </button>
    );
  }
}

export default class TableList extends Component {

  render() {

    const { features } = this.props.data;

    if (!features) {
      return (
        <p className="col-12 text-center mt-4 font-weight-bold">
          Select a municipality from the list. <br /> Then press the Load button
          to view the results
        </p>
      );
    } else {
      return (
        <table  className="table table-striped">
          <TableHeader features={features} /> 
          <TableRows features={features} />
        </table>
        
      );
    }
  }
}
