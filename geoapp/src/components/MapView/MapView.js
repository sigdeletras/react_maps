import React from "react";
import { Map, TileLayer, WMSTileLayer, LayersControl } from "react-leaflet";
import MapLayer from '../MapLayer/MapLayer'
import "leaflet/dist/leaflet.css";

export default class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geodata: ''
    };
  }

  render() {
    const styleMap = { "width": "100%", "height": "60vh" }
    const { BaseLayer, Overlay } = LayersControl

    return (
      <div>
        <Map
          style={styleMap}
          center={this.props.coordCenter}
          zoom={this.props.zoom}>

          <LayersControl position="topright">

            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            <BaseLayer name="PNOA">
              <WMSTileLayer
                layers={'OI.OrthoimageCoverage'}
                attribution='&copy; <a href="http://osm.org/copyright">IGN</a>'
                url="http://www.ign.es/wms-inspire/pnoa-ma?"
              />
            </BaseLayer>

            <Overlay checked name="Servicios Sanitarios (DERA)">
              <MapLayer data={this.props.geodata} />
            </Overlay>

          </LayersControl>

        </Map>
      </div>
    )

  }

}

