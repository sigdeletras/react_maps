import React, { Component } from "react";
import PubSub from "pubsub-js";

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
        <table className="table table-striped">
          <thead>
            <tr>
              <th> </th>
              <th>CODMUN</th>
              <th>CENTRO</th>
              <th>TIPO CENTRO</th>
              <th>TITULARIDAD</th>
            </tr>
          </thead>
          <tbody>
            {features &&
              features.map((f) => (
                <tr key={f.id}>
                  <td> <ButtonZoom coor={f.geometry.coordinates} /> </td>
                  <td> {f.properties.codmun} </td>
                  <td> {f.properties.centro} </td>
                  <td> {f.properties.tipocentro} </td>
                  <td> {f.properties.titularida} </td>
                </tr>
              ))}
          </tbody>
        </table>
      );
    }
  }
}
