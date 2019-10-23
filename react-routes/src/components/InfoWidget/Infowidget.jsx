import React, { Fragment } from 'react';

const Infowidget = props => {
  return (
    <Fragment>
      <h2>Hello: {props.user.name}</h2>
      <img src={props.user.image} alt="" />
    </Fragment>
  );
};

export default Infowidget;
