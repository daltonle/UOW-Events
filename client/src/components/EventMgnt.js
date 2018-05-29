import React, { Component } from 'react';
import './styles/EventMgnt.css';
import TopBar from './TopBar'; 
import {NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EventForm from './EventForm';
import moment from 'moment';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash';


class EventMgnt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventEdit: {}
    }
    
    this.afterAdd = this.afterAdd.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/event/host/${localStorage.getItem('id')}`)
    .then(res => res.json())
    .then(_events => {
      for (var i = 0; i < _events.length; i++) {
        if (moment(_events[i].start).isAfter(moment())) {
          _events.splice(0,i);
          break;
        }
      }
      this.setState({events: _events});
    })
  }

  handleRedirect(id) {
    this.props.history.push(`/browse/${id}`);
  }

  handleEdit(event) {
    this.setState({eventEdit: event});
    this.refs.editContainer.style.display = 'block';
  }

  handleDelete(event) {
    confirmAlert({
      title: 'Confirm',
      message: `You're about to delete the event ${event.title}. This action is irreversibe.`,
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            fetch('/api/event/delete', {
              method: 'delete',
              headers: new Headers({'Content-Type': 'application/json'}),
              body: JSON.stringify(event)
            })
            .then(res => res.json())
            .then(_event => {
              let _events = this.state.events;
              for (var i = 0; i < _events.length; i++) {
                if (_event._id === _events[i]._id) {
                  _events.splice(i,1);
                  this.setState({events: _events});
                  break;
                }
              }
            })

            NotificationManager.success('', 'Event deleted', 3000);
          }
        },
        {
          label: 'Cancel',
          onClick: () => {}
        }
      ]
    })
  }

  afterAdd = (event) => {
    let _events = this.state.events;
    _events.push(event);
    this.setState({events: _events});
  }

  afterEdit = (event) => {
    let _events = this.state.events;
    for (var i = 0; i < _events.length; i++) {
      if (event._id === _events[i]._id) {
        _events.splice(1, 1, event);
        this.setState({events: _events});
        break;
      }
    }
    this.refs.editContainer.style.display = 'none';
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <TopBar history={this.props.history} />
        <div className="page-container">
          <div className="event-management-title">
            <span>Event Management</span>
          </div>
          <div className="list-header">
            <h2>Your events</h2>
          </div>
          <div className="list-content">
            {this.state.events.map(event => 
              <div className="list-item" key={event._id}>
                <a onClick={this.handleRedirect.bind(this, event._id)}>{moment(event.start).format('DD/MM/YYYY')} - {event.title}</a>
                <button onClick={this.handleEdit.bind(this, event)}><FaEdit /></button><button onClick={this.handleDelete.bind(this, event)}><FaTrash /></button>
              </div>
            )}
          </div>
          <div ref="editContainer" className="edit-event-container" style={{display: 'none'}}>
            <h2>Edit event</h2>
            <EventForm operation="edit" event={this.state.eventEdit} afterEdit={this.afterEdit}/>
          </div>
          <div className="create-event-header">
            <h2>Create a new event</h2>
          </div>
          <div className="create-event-form">
            <EventForm operation="add" history={this.props.history} afterAdd={this.afterAdd}/>
          </div>
        </div>
      </div>
    );
  }
}



export default EventMgnt;