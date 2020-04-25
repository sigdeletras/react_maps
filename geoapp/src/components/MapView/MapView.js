import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import datamontoro from "./data/montoro.json"
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geodata: datamontoro
    };
  }

  componentWillUpdate() {
    console.log('props');
    console.log(this.props);
  }


  render() {
    const styleMap = { "width": "100%", "height": "60vh" }


    return (
      <div>
        <Map
          style={styleMap}
          center={this.props.coordCenter}
          zoom={this.props.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

          <GeoJSON
            data={this.props.geodata}
          />
        </Map>
      </div>
    )

  }

}

