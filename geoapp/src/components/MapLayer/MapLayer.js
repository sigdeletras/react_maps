import React, { Component } from 'react'
import datamontoro from "./data/montoro.json"
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class MapLayer extends Component {

    // constructor(props){
    //     super(props);
    //     this.state={
    //         key: this.props.layer.name,
    //         data: this.props.layer,
    //         style: {
    //             weight: 0,
    //             fillColor: this.props.color,
    //             fillOpacity: this.props.color,
    //             styleChanged: false
    //         },
    //     }
    // }



  // geoJSONStyle() {
  //   return {
  //     color: '#1f2021',
  //     weight: 1,
  //     fillOpacity: 0.5,
  //     fillColor: '#fff2af',
  //   }
  // }

  onEachFeature(feature, layer) {
    const popupContent = ` <Popup><p>Customizable Popups <br />with feature information.</p><pre>Borough: <br />${feature.properties.name}</pre></Popup>`
    layer.bindPopup(popupContent)
  }
    
    render() {
        return (
            <div>
                <GeoJSON
                    // key={this.state.key}
                    data={datamontoro}
                    onEachFeature={this.onEachFeature} 
                />
            </div>
        )
    }
}
