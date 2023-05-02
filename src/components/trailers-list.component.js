import React, { Component } from "react";
import TrailerDataService from "../services/trailers.service";

import Trailers from "./trailers.component";

export default class TrailersList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTrailers = this.setActiveTrailers.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      trailersLs: [],
      currentTrailers: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = TrailerDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let trailersLs = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      trailersLs.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
        url: data.url,
      });
    });

    this.setState({
      trailersLs: trailersLs,
    });
  }

  refreshList() {
    this.setState({
      currentTrailers: null,
      currentIndex: -1,
    });
  }

  setActiveTrailers(trailers, index) {
    this.setState({
      currentTrailers: trailers,
      currentIndex: index,
    });
  }

  render() {
    const { trailersLs, currentTrailers, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Trailers </h4>

          <ul className="list-group">
            {trailersLs &&
              trailersLs.map((trailer, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveTrailers(trailer, index)}
                  key={index}
                >
                  {trailer.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTrailers ? (
            <Trailers
              trailers={currentTrailers}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Trailers...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}