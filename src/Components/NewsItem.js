import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, source, pubDate } = this.props;
    return (
      <div className="card">
        <span
          className="position-absolute badge rounded-pill bg-danger translate-middle-y"
          style={{ right: '0%' }}
        >
          {source}
        </span>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {title}</h5>
          <p className="card-text">{description}</p>
          <p className="text-muted">
            Published on {new Date(pubDate).toLocaleDateString("en-IN")}
          </p>
          <a href={url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
