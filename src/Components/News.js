import React, { Component } from 'react';
import NewsItem from './NewsItem';
import { PropTypes } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  //default props and proptypes
  static defaultProps = {
    country: 'in',
    category: 'sports',
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  //constructor for state initialization
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = 'NewsApp - ' + this.capitalizeFirstLetter(props.category);
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async updateNews() {
    this.props.setProgress(0);
    let apiUrl = `https://newsdata.io/api/1/news?&apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}`;
    let data = await fetch(apiUrl);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.results,
      nextPage: parsedData.nextPage,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }

  componentDidMount() {
    this.updateNews();
  }

  // handleNextClick = async () => {
  //   //this.callApi(`${this.url}&${this.state.nextPage}`);

  //   let data = await fetch(
  //     `https://newsdata.io/api/1/news?apikey=pub_18516b375cc119db300da43ae91080c7911a&country=${this.props.country}&category=${this.props.category}&page=${this.state.nextPage}`
  //   );
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.results,
  //     nextPage: parsedData.nextPage,
  //     totalResults: parsedData.totalResults,
  //   });
  //   console.log(parsedData);
  // };

  //fetch data to continuous loading
  fetchMoreData = async () => {
    let data = await fetch(
      `https://newsdata.io/api/1/news?apikey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&page=${this.state.nextPage}`
    );
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.results),
      nextPage: parsedData.nextPage,
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: '20px' }}>
          NewApp - News on {this.props.category}
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.link}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.image_url}
                      url={element.link}
                      source={element.source_id}
                      pubDate={element.pubDate}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between my-3">
            <button
              className="btn btn-dark"
              disabled={this.state.prevPage ? false : true}
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button className="btn btn-dark" onClick={this.handleNextClick}>
              Next &rarr;
            </button>
          </div> */}
      </>
    );
  }
}
