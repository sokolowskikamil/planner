import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as eventAction from './actions/eventAction';
import * as _ from 'lodash';


class App extends Component {

  constructor(props){
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeHour = this.handleChangeHour.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     
    this.state = {
      day: '',
      hour: '',
      name: '',
      id: ''
    }
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  handleChangeHour(e){
    this.setState({
      hour: e.target.value
    })
  }

  handleChangeDay(e){
    this.setState({
      day: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let event = {
      day: this.state.day,
      hour: this.state.hour,
      name: this.state.name
    }
    this.setState({
      day: '',
      hour: '',
      name: '',
    });
    this.props.createEvent(event);
  }

  listView(data){
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={data.id} className="list-group-item clearfix">
          {data.hour} {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteEvent(e, data.id)} className="btn btn-danger">
            Usuń
          </button>
        </div>
    </div> 
    )
  }

  deleteEvent(e, index){
    e.preventDefault();
    this.props.deleteEvent(index);
  }

  render() {

    return(
      <div className="container">
        <h1>Planowanie tygodnia</h1>
        <hr />
        <div>
          <h3>Dodaj zaplanowane wydarzenie</h3>
          <form onSubmit={this.handleSubmit}>
          <label for="day" className="col-2 col-form-label">Dzień tygodnia</label>
              <select id="day" type="text" onChange={this.handleChangeDay} className="form-control" value={this.state.day} required>
                <option value='' disabled>Wybierz dzień...</option>
                <option value="Poniedziałek">Poniedziałek</option>
                <option value="Wtorek">Wtorek</option>
                <option value="Środa">Środa</option>
                <option value="Czwartek">Czwartek</option>
                <option value="Piątek">Piątek</option>
                <option value="Sobota">Sobota</option>
                <option value="Niedziela">Niedziela</option>
              </select>
              <label for="hour" className="col-2 col-form-label">Godzina</label>
            <input id="hour" type="time"  onChange={this.handleChangeHour} className="form-control" value={this.state.hour} required/>
            <label for="name" className="col-2 col-form-label">Opis wydarzenia</label>
            <input id="name" type="text" onChange={this.handleChangeName} className="form-control" value={this.state.name} required/><br />
            <input type="submit" className="btn btn-success" value="Dodaj"/>
          </form>
          <hr />
          <h2>Poniedziałek: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Poniedziałek']).map((event, i) => this.listView(event))}
        </ul>}
        <h2>Wtorek: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Wtorek']).map((event, i) => this.listView(event))}
        </ul>}
        <h2>Środa: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Środa']).map((event, i) => this.listView(event))}
        </ul>}
        <h2>Czwartek: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Czwartek']).map((event, i) => this.listView(event))}
        </ul>}
        <h2>Piątek: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Piątek']).map((event, i) => this.listView(event))}
        </ul>}
        <h2>Sobota: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Sobota']).map((event, i) => this.listView(event))}
        </ul>}
        <h2>Niedziela: </h2>
        {<ul className="list-group">
          {_.filter(this.props.events, ['day', 'Niedziela']).map((event, i) => this.listView(event))}
        </ul>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let events = _.sortBy(state.events,['day', 'hour'])
  return {
    events
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: event => dispatch(eventAction.createEvent(event)),
    deleteEvent: index =>dispatch(eventAction.deleteEvent(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
