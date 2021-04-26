import React from 'react';

import CalendarView from 'components/CalendarView';
import List from 'components/List';

import 'App.css';

const serviceList = {
  1: 'service 1',
  2: 'service 2',
  3: 'service 3',
};

function App() {
  const [state, setState] = React.useState({ service: undefined, date: undefined });

  const onServiceSelect = (service) => {
    setState({ ...state, service });
  };

  const onDateSelect = (date) => {
    alert(date);
    setState({ ...state, date });
  };

  return (
    <div>
      <List
        onServiceSelect={onServiceSelect}
        data={Object.entries(serviceList).map(([key, value]) => ({ key, value }))}
      />

      <div className="App">
        <main>
          <CalendarView onChange={onDateSelect} />
        </main>
      </div>
    </div>
  );
}

export default App;
