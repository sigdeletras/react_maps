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


![react.png](/img/react.png)

Las tareas finalizadas son las siguientes
- 06 crear componente TableList
- 14 Datos WFS en Tabla
- 17 consulta datos en tabla
- 18 conexión mapa-tabla


Los temas aprendidos sobre React a partir del desarrollo de estas tareas son los siguientes:
- 

![04_sprint4.gif](/img/04_sprint4.gif)


# Mejoras de código

Warning

Together with componentDidUpdate, this new lifecycle should cover all use cases for the legacy componentWillReceiveProps.

# Componente TableList

En este nuevo componente vamos a presentar en formato tabla los resultados obtenidos desde el servicio WFS de la Junta de Andalucía. Son los mismos datos que usamos para añadir el GeoJSON al mapa

Queremos que se se pueda aprovechar en el caso que se implementado la consulta de otra capa con sus propios atributos. Para ello, la solución ha sido añadir dentro  dos "subcompoentes". En este caso he probado a crear componentes funcionales.

El primero llamado *TableHeader* se va a encargar de obtener  la primera fila que corresponderá con el nombre de los campos. La información se encuentra del objeto GeoJSON en el valor de *properties*. Obtenemos mediante la función *map* y usamos el método [Object.keys()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/keys) que devuelve un array de las propiedades *names* de un objeto. Los datos los añadimos al elemento th dentro de la tabla.

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

Para las filas, seguimos el mismos procedimiento, pero en esta ocasión usamos [Object.values()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/values) que *"devuelve un array con los valores correspondientes a las propiedades enumerables de un objeto".*

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
# Implementando un botón de zum con Observer Pattern

Si existen varios registros en la tabal es inetresante añadir un bótón que permita hacer zum al elemento. Para obtener uan comunicación más directa entre los comeponente y que permita usar ejecutar el método flyTo() de Leaflet en el compomente *MapView* se ha usado el [**patrón observador**](https://es.wikipedia.org/wiki/Observer_(patr%C3%B3n_de_dise%C3%B1o)) usando la librería [PubSub](https://www.npmjs.com/package/pubsub-js).



npm i pubsub-js -S

En *TableList* debemos exportar la librería que hemos importado.


```javascript
//TableList.js
import React, { Component } from "react";
import PubSub from "pubsub-js";
```

```javascript
//TableList.js
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
```

El componente final quedará así

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

## Resumen de  tareas realizadas en el Sprint #3

![04_trello.png](/img/04_trello.png)

## Hilo de entradas

- [Side Project: Desarrollo de aplicación web con React y Leaflet (I)](http://www.sigdeletras.com/2020/side-project-desarrollo-de-aplicacion-web-con-react-y-leaflet-i/)
- [Side Project: Desarrollo de aplicación web con React y Leaflet (II). Creando componentes](http://www.sigdeletras.com/2020/side-project-desarrollo-de-aplicacion-web-con-react-y-leaflet-ii-components/)
- [Side Project: Desarrollo de aplicación web con React y Leaflet (III). Funciones, estado y props](http://www.sigdeletras.com/2020/side-project-iii/)
- [Side Project: Desarrollo de aplicación web con React y Leaflet (IV). Datos de servicios sanitarios desde WFS](http://www.sigdeletras.com/2020/side-project-4-react-y-leaflet-wfs/)

## Enlaces 

- Repositorio GitHub [React & Maps](https://github.com/sigdeletras/react_maps) (rama *master*)