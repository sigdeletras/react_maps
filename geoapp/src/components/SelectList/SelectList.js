import React from 'react'
import municipalities from './data/ municipalities.json'

export default class SelectList extends React.Component {

    state = {
        data: municipalities,
        selectCoord: '',
    }

    selectListChange = (e) => {
        if (e.target.value) {
            this.setState({
                selectCoord: e.target.value,
            });
        }
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <label>Municipality</label>
                <select className="form-control" onChange={this.selectListChange}>
                    <option value="">Select one...</option>
                    {data.map((m) =>
                        <option key={m.id} value={[m.coordinates, m.name, m.code]}>{m.name}</option>
                    )}
                </select>
                <button className="btn btn-primary mt-3 mb-3"
                    disabled={!this.state.selectCoord}
                    onClick={this.props.munipalityChange.bind(this, this.state.selectCoord)}>
                    Load</button>
            </div>
        )
    }
}