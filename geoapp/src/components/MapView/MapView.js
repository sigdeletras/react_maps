import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

class MapView extends React.Component {
  render() {
    const styleMap = { "width": "100%", "height": "60vh" }
    return (
     
      <Map
        style={styleMap}
        center={this.props.coordCenter}
        zoom={this.props.zoom}>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      </Map>
    )
  }

}

export default MapView;