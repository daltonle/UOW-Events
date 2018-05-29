import React, { Component } from 'react';
import './styles/EventForm.css';
import {NotificationManager} from 'react-notifications';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-datepicker/dist/react-datepicker.css';


class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: "",
        start: moment().format('YYYY-MM-DDTHH:mm'),
        finish: moment().add(3, "months").format('YYYY-MM-DDTHH:mm'),
        venue: "",
        host: "",
        capacity: 0,
        desc: "",
        price: 0,
        promoCode: "",
        promoValue: 0,
        image: "",
        attendees: []  
      },
      titleValid: false,
      capacityValid: false,
      venueValid: false,
      priceValid: true,
      promoValid: true,
      isFree: true,
    }
    
    this.afterWrite = this.afterWrite.bind(this);
  }

  componentDidMount() {
    if (this.props.event) {
      let _event = this.props.event;
      let promoVal = _event.promoValue*100;
      _event.promoValue = promoVal;
      let _isFree = (_event.price === 0);
      this.setState({
        event: _event,
        titleValid: true,
        capacityValid: true,
        venueValid: true,
        priceValid: true,
        promoValid: true,
        isFree: _isFree,
      });
    }
    else {
      let _event = this.state.event;
      fetch(`/api/user/id/${localStorage.getItem('id')}`)
      .then(res => res.json())
      .then(user => {
        _event.host = user._id;
        _event.attendees.push(user._id);
      });
      this.setState({event: _event});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      let _event = nextProps.event;
      let promoVal = _event.promoValue*100;
      _event.promoValue = promoVal;
      let _isFree = (_event.price === 0);
      this.setState({
        event: _event,
        titleValid: true,
        capacityValid: true,
        venueValid: true,
        priceValid: true,
        promoValid: true,
        isFree: _isFree,
      });
    }
    else {
      let _event = this.state.event;
      fetch(`/api/user/id/${localStorage.getItem('id')}`)
      .then(res => res.json())
      .then(user => {
        _event.host = user._id;
        _event.attendees.push(user._id);
      });
      this.setState({event: _event});
    }
  }

  handleTitleChange(e) {
    let _event = this.state.event;
    _event.title = e.target.value;
    this.setState({event: _event});

    if (e.target.value === '') {
      this.refs.titleWarning.innerHTML = "Title can't be blank.";
      this.setState({titleValid: false});
    }
    else {
      this.refs.titleWarning.innerHTML = "";
      this.setState({titleValid: true});
    }
  }

  handleStartChange(date) {
    if (date.isAfter(moment(this.state.event.finish))) {
      this.refs.startWarning.innerHTML = "Start date must be before finish date."
    }
    else {
      let _event = this.state.event;
      _event.start = date.format('YYYY-MM-DDTHH:mm');
      this.setState({event: _event});
      this.refs.startWarning.innerHTML = "";
    }
  }

  handleFinishChange(date) {
    if (date.isBefore(moment(this.state.event.start))) {
      this.refs.finishWarning.innerHTML = "Finish date must be after start date.";
    }
    else {
      let _event = this.state.event;
      _event.finish = date.format('YYYY-MM-DDTHH:mm');
      this.setState({event: _event});
      this.refs.finishWarning.innerHTML = "";
    }
  }

  handleCapacityChange(e) {
    let _event = this.state.event;
    _event.capacity = e.target.value;
    this.setState({event: _event});

    let regex = /\D/;
    if (regex.test(e.target.value) || (e.target.value === '')) {
      this.refs.capacityWarning.innerHTML = "Invalid capacity.";
      this.setState({capacityValid: false});
    }
    else {
      this.refs.capacityWarning.innerHTML = "";
      this.setState({capacityValid: true});
    }
  }

  handleVenueChange(e) {
    let _event = this.state.event;
    _event.venue = e.target.value;
    this.setState({event: _event});

    if (e.target.value === '') {
      this.refs.venueWarning.innerHTML = "Location can't be blank.";
      this.setState({venueValid: false});
    }
    else {
      this.refs.venueWarning.innerHTML = "";
      this.setState({venueValid: true});
    }
  }

  handlePriceChange(e) {
    let _event = this.state.event;
    _event.price = e.target.value;
    this.setState({event: _event});

    let regex = /\D/;
    if (regex.test(e.target.value) || (e.target.value === '')) {
      this.refs.priceWarning.innerHTML = "Invalid price.";
      this.setState({priceValid: false});
    }
    else {
      this.refs.priceWarning.innerHTML = "";
      this.setState({priceValid: true});
    }
  }

  handlePromoCodeChange(e) {
    let _event = this.state.event;
    _event.promoCode = e.target.value;
    this.setState({event: _event});

    if (e.target.value === '') {
      if (this.state.event.promoValue !== 0) {
        this.refs.promoValueWarning.innerHTML = "No promo code available.";
        this.setState({promoValid: false});
      }
    }
    else {
      this.refs.promoValueWarning.innerHTML = "";
      this.setState({promoValid: true});
    }
  }

  handleFreeChange(e) {
    let _event = this.state.event;
    _event.price = 0;
    _event.promoCode = "";
    _event.promoValue = 0;
    this.setState({event: _event, isFree: !this.state.isFree, priceValid: true});
  }

  handlePromoValueChange(e) {
    let _event = this.state.event;
    _event.promoValue = e.target.value;
    this.setState({event: _event});

    let regex = /\D/;
    if (this.state.event.promoCode === "") {
      if (e.target.value !== '0' || e.target.value !== '') {
        this.refs.promoCodeWarning.innerHTML = "No promo code available.";
        this.setState({promoValid: false});
      }
      else {
        this.refs.promoValueWarning.innerHTML = "";
        this.setState({promoValid: true});
      }
    }
    else if (regex.test(e.target.value) || (e.target.value === '') || e.target.value < 0 || e.target.value > 100) {
      this.refs.promoValueWarning.innerHTML = "Invalid discount value.";
      this.setState({promoValid: false});
    }
    else {
      this.refs.promoValueWarning.innerHTML = "";
      this.setState({promoValid: true});
    }
  }

  handleImageChange(e) {
    let _event = this.state.event;
    _event.image = e.target.value;
    this.setState({event: _event});
  }

  handleDescChange(e) {
    let _event = this.state.event;
    _event.desc = e.target.value;
    this.setState({event: _event});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.capacityValid === false || this.state.titleValid === false ||
      this.state.priceValid === false || this.state.promoValid === false || this.state.venueValid === false) {
      NotificationManager.error('Something went wrong. Please check your details.', 'Oops!', 5000);
    }
    else {
      let event = this.state.event;
      event.promoValue = event.promoValue/100;
      if (event.image === '') {
        event.image = '/images/1.jpg';
      }
      fetch('/api/event/write', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(event)
      })
      .then(res => res.json())
      .then(event => {
        this.afterWrite(event);
      })

      this.setState({
        event: {
          title: "",
          start: moment().format('YYYY-MM-DDTHH:mm'),
          finish: moment().add(3, "months").format('YYYY-MM-DDTHH:mm'),
          venue: "",
          host: this.state.event.host,
          capacity: 0,
          desc: "",
          price: 0,
          promoCode: "",
          promoValue: 0,
          image: "",
          attendees: this.state.event.attendees 
        },
        titleValid: false,
        capacityValid: false,
        venueValid: false,
        priceValid: true,
        promoValid: true,
        isFree: true
      })

      if (this.props.operation === "add") {
        NotificationManager.success('New event added', 'Great!', 3000);
      }
      else if (this.props.operation === "edit") {
        NotificationManager.success('', 'Changes saved', 3000);
      }
    }
  }

  afterWrite(event) {
    if (this.props.operation === 'add') {
      this.props.afterAdd(event);
    }
    if (this.props.operation === 'edit') {
      this.props.afterEdit(event);
    }
  }

  render() {
    return (
      <form className="event-form-container" onSubmit={this.handleSubmit.bind(this)}>
        <div className="title">
          <label>Title</label>
          <input
            type="text"
            value={this.state.event.title}
            placeholder="Event title"
            onChange={this.handleTitleChange.bind(this)} />
          <p ref="titleWarning"></p>
        </div>
        <div className="start">
          <label>Start</label>
          <DatePicker
            selected={(this.state.event.start)? moment(this.state.event.start) : moment()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="Time"
            minDate={moment()}
            maxDate={(this.state.event.finish)? moment(this.state.event.finish) : moment().add(10, "years")}
            showDisabledMonthNavigation
            onChange={this.handleStartChange.bind(this)}
          />
          <p ref="startWarning"></p>
        </div>
        <div className="finish">
          <label>Finish</label>
          <DatePicker
            selected={(this.state.event.finish)? moment(this.state.event.finish) : moment().add(1, "weeks")}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="Time"
            minDate={(this.state.event.start)? moment(this.state.event.start) : moment()}
            maxDate={moment().add(10, "years")}
            showDisabledMonthNavigation
            onChange={this.handleFinishChange.bind(this)}
          />
          <p ref="finishWarning"></p>
        </div>
        <div className="location">
          <label>Location</label>
          <input
            type="text"
            value={this.state.event.venue}
            placeholder="Location"
            onChange={this.handleVenueChange.bind(this)} />
            <p ref="venueWarning"></p>
        </div>
        <div className="capacity">
          <label>Capacity</label><br/>
          <input
            type="text"
            value={this.state.event.capacity}
            placeholder="Capacity"
            onChange={this.handleCapacityChange.bind(this)} />
          <p ref="capacityWarning"></p>
        </div>
        <div className="price">
          <label>Price</label><br/>
          AU ${(this.state.isFree === false)? 
          <input
            type="text"
            value={this.state.event.price}
            placeholder="Price"
            onChange={this.handlePriceChange.bind(this)} /> :
          <input
            disabled="disabled"
            type="text"
            value={this.state.event.price}
            placeholder="Price"
            onChange={this.handlePriceChange.bind(this)} />
          }
          <p ref="priceWarning"></p>
        </div>
        <div className="price-free">
          <label>Free</label><br/>
          <label className="switch">
            <input type="checkbox" ref="freeCheck" defaultChecked onChange={this.handleFreeChange.bind(this)}/>
            <span className="slider round"></span>
          </label>
        </div>
        <div className="promoCode">
          <label>Promo Code</label>
          {(this.state.isFree === false)? 
          <input
            type="text"
            value={this.state.event.promoCode}
            placeholder="Promo"
            onChange={this.handlePromoCodeChange.bind(this)} /> :
          <input
            disabled="disabled"
            type="text"
            value={this.state.event.promoCode}
            placeholder="Promo"
            onChange={this.handlePromoCodeChange.bind(this)} />
          }
        </div>
        <div className="promoValue">
          <label>Discount</label>
          {(this.state.isFree === false)? 
          <input
            type="text"
            value={this.state.event.promoValue}
            placeholder="Value"
            onChange={this.handlePromoValueChange.bind(this)} /> :
          <input
            disabled="disabled"
            type="text"
            value={this.state.event.promoValue}
            placeholder="Value"
            onChange={this.handlePromoValueChange.bind(this)} />
          } %
          <p ref="promoValueWarning"></p>
        </div>
        <div className="image">
          <input
            type="text"
            value={this.state.event.image}
            placeholder="Image URL"
            onChange={this.handleImageChange.bind(this)} />
        </div>
        <div className="desc">
          <label>Description</label><br/>
          <textarea 
            value={this.state.event.desc}
            placeholder="Event description"
            onChange={this.handleDescChange.bind(this)}
            cols="30" rows="10"></textarea>
        </div>
        <div className="submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    );
  }
}



export default EventForm;