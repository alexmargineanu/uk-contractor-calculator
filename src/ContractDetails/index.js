import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class ContractDetails extends Component {

  handleChangeWeeks = (e) => {
    this.props.onChangeWeeks(e.target.value * 1);
  }
  handleChangeDayRate = (e) => {
    this.props.onChangeRate(e.target.value * 1);
  }

  render() {
    return (
      <div className="rateAndWeeks">
        <Input
          type="number"
          min="1"
          value={this.props.noWeeks}
          onChange={this.handleChangeWeeks}
          label={{ content: 'weeks' }}
          labelPosition='right'
          placeholder='Weeks'
          size='large'
        />
        @
        <Input
          type="number"
          step="10"
          min="0"
          onChange={this.handleChangeDayRate}
          value={this.props.dayRate}
          label={{ content: '£/day' }}
          labelPosition='right'
          placeholder='Day rate'
          size='large'
        />
      </div>
    );
  }
}

ContractDetails.propTypes = {
  onChangeRate: PropTypes.func.isRequired,
  onChangeWeeks: PropTypes.func.isRequired,
  dayRate: PropTypes.number.isRequired,
  noWeeks: PropTypes.number.isRequired,
};

export default ContractDetails;
