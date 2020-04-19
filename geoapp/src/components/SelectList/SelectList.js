import React from 'react'
import municipalities from './data/ municipalities.json'

class SelectList extends React.Component {

    state = {
        data: municipalities
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <label>Municipality</label>
                <select
                    className="form-control"
                    onChange={this.selectListChange}>
                    <option value="">Selecciona un municipio</option>
                    {data.map((m) =>
                        <option key={m.id} value={[m.coordinates, m.name]}>{m.name}</option>
                    )}
                </select>
            </div>
        )
    }
}
export default SelectList;