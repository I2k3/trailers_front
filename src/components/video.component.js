import React, { Component } from "react";
import TrailerDataService from "../services/trailers.service";

export default class TrailersList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTrailers = this.setActiveTrailers.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      trailersList: [],
      currentTrailers: null,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = TrailerDataService.getAll()
      .orderBy("title", "asc")
      .onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let trailersList = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      trailersList.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
        url: data.url,
      });
    });

    this.setState({
      trailersList: trailersList,
    });
  }

  refreshList() {
    this.setState({
      currentTrailers: null,
    });
  }

  setActiveTrailers(trailers) {
    this.setState({
      currentTrailers: trailers,
    });
  }

  render() {
    const { trailersList, currentTrailers } = this.state;

    return (
      <div className="gallery">
        {currentTrailers ? (
          <div>
            <div>
              <h4>Titulo: {currentTrailers.title}</h4>
              <p>Descripcion: {currentTrailers.description}</p>
              <video className="firebase-video" controls>
                <source src={currentTrailers.url} />
              </video>
            </div>
            <div className="divButton">
              <button className="buttonStl" onClick={this.refreshList}>
                Regresar
              </button>
            </div>
          </div>
        ) : (
          trailersList &&
          trailersList.map((trailer) => (
            <div className="gallery-item" key={trailer.id}>
              <h4>{trailer.title}</h4>
              <video src={trailer.url} alt={trailer.title} onClick={() => this.setActiveTrailers(trailer)} />
              <div className="gallery-item-description">
                <p>{trailer.description}</p>
                <button
                  className="buttonStl"
                  onClick={() => this.setActiveTrailers(trailer)}
                >
                  Detalles
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
