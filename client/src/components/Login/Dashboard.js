import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import App from '../../../src/App'

function Dashboard(props) {
  const user = getUser();

 
  return (
    <div>
      <App/>
    </div>
  );
}

export default Dashboard;
