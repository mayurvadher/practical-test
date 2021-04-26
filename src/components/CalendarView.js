import React from 'react';
import moment from 'moment';

class CalendarView extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  getHeader() {
    const dateFormat = 'MMMM YYYY';

    return (
      <thead>
        <tr>
          <th onClick={this.prevMonth}>Prev Month</th>
          <th colSpan={5}>
            <span>{moment(this.state.currentMonth).format(dateFormat)}</span>
          </th>
          <th onClick={this.nextMonth}>Next Month</th>
        </tr>
      </thead>
    );
  }

  getDays() {
    const dateFormat = 'dddd';
    const days = [];
    let startDate = moment(this.state.currentMonth).startOf('week');

    for (let i = 0; i < 7; i++) {
      days.push(<td key={i}>{moment(startDate).add(i, 'days').format(dateFormat)}</td>);
    }

    return <tr>{days}</tr>;
  }

  setClass = (day) => (moment(this.state.currentMonth).format('M') === moment(day).format('M') ? 'enable' : 'disable');

  handleChange = () => alert();

  getCells = () => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = moment(currentMonth).startOf('month');
    const monthEnd = moment(monthStart).endOf('month');
    const startDate = moment(monthStart).startOf('week');
    const endDate = moment(monthEnd).endOf('week');
    const { onChange } = this.props;

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    let html = '';
    while (day <= endDate) {
      html = '';
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat);

        days.push(<span className="bg">{formattedDate}</span>);
        html += `<td key={${day}} className="${this.setClass(day)}">${formattedDate}</td>`;
        day = moment(day).add(1, 'days');
      }
      rows.push(html.replace(/['"]+/g, ''));
    }

    return rows;
  };

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).add(1, 'month'),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).subtract(1, 'month'),
    });
  };

  render() {
    return (
      <table border="1">
        {this.getHeader()}
        <tbody>
          {this.getDays()}
          {this.getCells().map((item, key) => {
            return <tr key={key} dangerouslySetInnerHTML={{ __html: item.replace(/['"]+/g, '') }}></tr>;
          })}
        </tbody>
      </table>
    );
  }
}

export default CalendarView;
