import React, { Component } from "react";
import TrailerDataService from "../services/trailers.service";
import ReactionsLike from "./reactions.component";
import Coments from "./comentarios.component";


export default class Trailer extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTrailer = this.updateTrailer.bind(this);
        this.deleteTrailer = this.deleteTrailer.bind(this);

        this.state = {
            currentTrailers: {
                id: null,
                title: "",
                description: "",
                published: false,
                url: "",
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { trailers } = nextProps;
        if (prevState.currentTrailers.id !== trailers.id) {
            return {
                currentTrailers: trailers,
                message: ""
            };
        }

        return prevState.currentTrailers;
    }

    componentDidMount() {
        this.setState({
            currentTrailers: this.props.trailers,
        });
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTrailers: {
                    ...prevState.currentTrailers,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTrailers: {
                ...prevState.currentTrailers,
                description: description,
            },
        }));
    }

    updatePublished(status) {
        TrailerDataService.update(this.state.currentTrailers.id, {
            published: status,
        })
            .then(() => {
                this.setState((prevState) => ({
                    currentTrailers: {
                        ...prevState.currentTrailers,
                        published: status,
                    },
                    message: "The status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateTrailer() {
        const data = {
            title: this.state.currentTrailers.title,
            description: this.state.currentTrailers.description,
        };

        TrailerDataService.update(this.state.currentTrailers.id, data)
            .then(() => {
                this.setState({
                    message: "The trailer was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteTrailer() {
        TrailerDataService.delete(this.state.currentTrailers.id)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentTrailers } = this.state;

        return (
            <div>
                <h4>Trailer</h4>
                {currentTrailers ? (
                    <div className="edit-form">
                        <form>
                            <video controls>
                                <source src={currentTrailers.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTrailers.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTrailers.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            < ReactionsLike />
                            < Coments />

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentTrailers.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentTrailers.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTrailer}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateTrailer}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Trailer...</p>
                    </div>
                )}
            </div>
        );
    }
}