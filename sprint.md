---
title:  "Side Project: Desarrollo de aplicación web con React y Leaflet (III). Datos desde WFS"
excerpt_separator: "<!--more-->"
comments: true
related: true
header:
  teaser: "/img/react.png" 
categories: 
  - 2020
tags:
  - react
  - leaflet
---

Con la siguiente entrada cierro por decirlo de algún modo este *side proyect* que me ha servido para emepzar a manejar la libreria React. Al final de esta entrada está el listado de enlaces que han surgido de todo esto, para quien esté interesado en seguir el hilo.

A modo de conclusión, comentar que **estoy realmente contecto del resultado**. He cumplido con el **objetivo principal** que me marqué que no era otro que el de **introducirme en el uso de React** y he desarrollado la aplicación que quería desarrollar cubriendo las funcionalidades definidas.  También me gusta la **metodología** que que seguido y que creo que aplicaré a aprendizajes futuros. Como en cualquier proyecto de desarrollo real, y con real me refiero proyecto para un cliente, ha sido básico definir correctamente el alcance de las tareas a realizar y marcarme un tiempo. Esto me ha ayudado a no desviarmente, organizar tiempo y sobre todo a saber cúando darlo por terminado. En este sentido, al final me han surgido posibles mejoras, nuevas funcionalidades o ampliaciones, pero como no estaban definidas en mi pila, las dejaré para otro proyecto.

Quisiera también comentar que este **sistema de autoaprendizaje tiene su aspecto negativo**. No contar con alguien que te revise el código, que te aporte comentarios o que simplemente te muestre otras vías para mejorar lo aprendido, me deja la sensación en algunas ocasiones de no saber si he usado la forma correcta de programar, aunque el código funcione correctamente.

![react.png](/img/react.png)

Este es el listado de Las tareas que quedaban por hacer:
- 06 crear componente TableList
- 14 Datos WFS en Tabla
- 17 consulta datos en tabla
- 18 conexión mapa-tabla


Los temas aprendidos sobre React a partir del desarrollo de estas tareas son los siguientes:
- Uso de componentes funcionales
- Concepto de patrón observador y patrón 

![04_sprint4.gif](/img/04_sprint4.gif)


# Componente TableList

En este último componente vamos a presentar en formato tabla los resultados obtenidos desde el servicio WFS de la Junta de Andalucía. Son los mismos datos que usamos para añadir el GeoJSON al mapa.

Queremos que sea totalmente reutilizable. Es decir si se desarrollara un función que permitiera consultar otra capa de datos, seguramente los atributos (properties) serían distintas respctto a su denominación y número. Esta es la casuística que debe tener en cuenta el complemento. Para solucionar esto he  creado dentro  *TableList* dos "subcompontes" funcionales.

El primero llamado *TableHeader* se va a encargar de obtener los nombres de las columnas. La información se encuentra del objeto GeoJSON en el valor de *properties*. OHe usado la función map() para obtener los datos y el método [Object.keys()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/keys) que devuelve un array de las propiedades *names* de un objeto. Los datos los añadimos al elemento *th* dentro de la tabla.

```javascript
//TableList.js
...
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

```

Para las filas, seguimos el mismo procedimiento, pero en esta ocasión usamos [Object.values()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/values) que *"devuelve un array con los valores correspondientes a las propiedades enumerables de un objeto".*

```javascript
//TableList.js
...
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
...
```

El componente final quedará así.

```javascript
//TablaList
...
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
          <TableHeader features={features} /> 
          <TableRows features={features} />
        </table>
      );
    }
  }
}
```

# Implementando un botón de zum gracias al patrón de diseño Pub-Sub.

Si existen varios registros en la tabla es interesante añadir un bótón que permita hacer zum al elemento dentro del mapa. Para obtener una comunicación directa entre los comeponente y que permita usar ejecutar el método *flyTo()* de Leaflet en el compomente *MapView* se ha usado el patrón de diseño [**observador**](https://es.wikipedia.org/wiki/Observer_(patr%C3%B3n_de_dise%C3%B1o))


Este patrón permite definir una dependencia de uno a muchos entre objetos, de forma que cuando un objeto (sujeto) cambie de estado se notifique y se actualicen automáticamente todos los objetos (observadores) que depende de él. Esta notificación se realiza normalmente a través de uno de su métodos. 

El patrón se ha usado para comunicar dos componentes hijos, en este caso *ButtonZoom* que obtiene las coordenadas desde las propiedades de cada *TableRows* y *MapView* que es donde se encuentra el evento del zum a las coordenadas pasadas.

Para ser más específicos se ha usado el patrón Pub-Sub(Publisher-Subscriber) que añade un evento intermedio. La implementación de este patrón se a realizado gracias a la librería [PubSub](https://www.npmjs.com/package/pubsub-js).

En esta entrada es donde he obtenido la parte teórica sobre el usos de estos patrones https://medium.com/@Aida_Pro_/observer-vs-eventbus-patrones-de-dise%C3%B1o-cd8178f48c7d

Lo primero que se ha realizado es la instalación de la librería y añadir la importación en los componentes donde los vamos a usar.

```
npm i pubsub-js -S
```

```javascript
//TableList.js
import React, { Component } from "react";
import PubSub from "pubsub-js";
```

Creamos el la función que vamos publicar. La función se denominará zoomFeature() y estará dentro del componente de clase ButtonZoom(). Este compomente devuelve un boón con un evento onClick que llama a nuestra función.

```javascript
//TableList.js
class ButtonZoom extends Component {

  zoomFeature = () => {
    PubSub.publish("zoomFromTableRow", this.props.coor);
  };
  
  render() {
    return (
      <button
        ref={this.leafletRef}
        className="btn btn-primary"
        onClick={this.zoomFeature}>
        <i class="icon-zoom-in"> </i>
      </button>
    );
  }
}
```
Añadimos este componente en cada una de las filas que se pintan en la tabla.


Ahora  vamos a definir los observadores/suscriptores de nuetro evento. En la aplicación será el compomente MapView que es donde podemos usar los métidos de Leaflet gracias al uso de referencias como comentamos en el artículo anterior. La suscripción la hacemos dentro del cliclo de vida *componentDidMount()*.

```javascript
import React from "react";
import { Map, TileLayer, WMSTileLayer, LayersControl } from "react-leaflet";
import MapLayer from '../MapLayer/MapLayer'
import "leaflet/dist/leaflet.css";
import PubSub from 'pubsub-js'

export default class MapView extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      geodata: ''
    };
  }

  componentDidMount() {
    PubSub.subscribe('zoomFromTableRow', (e, aCoor) => {
      const leafletMap = this.leafletMap.leafletElement;
      leafletMap.flyTo([aCoor[1], aCoor[0]], 18);
    })
  }
```



## Resumen de  tareas realizadas en el Sprint #3

![04_trello.png](/img/04_trello.png)

## Hilo de entradas

- [Side Project: Desarrollo de aplicación web con React y Leaflet (I)](http://www.sigdeletras.com/2020/side-project-desarrollo-de-aplicacion-web-con-react-y-leaflet-i/)
- [Side Project: Desarrollo de aplicación web con React y Leaflet (II). Creando componentes](http://www.sigdeletras.com/2020/side-project-desarrollo-de-aplicacion-web-con-react-y-leaflet-ii-components/)
- [Side Project: Desarrollo de aplicación web con React y Leaflet (III). Funciones, estado y props](http://www.sigdeletras.com/2020/side-project-iii/)
- [Side Project: Desarrollo de aplicación web con React y Leaflet (IV). Datos de servicios sanitarios desde WFS](http://www.sigdeletras.com/2020/side-project-4-react-y-leaflet-wfs/)

## Enlaces 

- Repositorio GitHub [React & Maps](https://github.com/sigdeletras/react_maps) (rama *master*)