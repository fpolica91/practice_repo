import React, { Component } from 'react'

export default class SearchBar extends Component {

  render() {
    return (
      <div style={{ marginBottom: '10px' }}>
        <legend>Search</legend>
        <input style={{ width: '40%', margin: '0 auto' }}
          className="form-control"
          onChange={(e) => this.props.search(e.target.value)}
          type="text"
          name="searchTerm"
          value={this.props.searchTerm}
        />
      </div>
    )
  }
}
