import React from 'react';

import style from './style.module.css';

export default class Filter extends React.Component {
  handleClick = () => {
    this.props.onFilterChange(this.props.name.toUpperCase());
  };

  render() {
    const { name } = this.props;
    return (
      <button onClick={this.handleClick} className={style.groupBtn}>
        {name}
      </button>
    );
  }
}
