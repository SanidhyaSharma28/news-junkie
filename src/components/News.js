import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static propTypes = {
        pagesize: PropTypes.number,
        category: PropTypes.string
    }

    static defaultProps = {
        pagesize: 8,
        category: "general"
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Junkie`;
        console.log("Component initialized with state:", this.state);
    }

    async componentDidMount() {
        console.log("componentDidMount called");
        await this.UpdateNews();
    }

    async componentDidUpdate(prevProps) {
        console.log("componentDidUpdate called");
        if (prevProps.SearchQuery !== this.props.SearchQuery) {
            console.log("SearchQuery prop changed:", this.props.SearchQuery);
            this.setState({
                page: 1
            });
            await this.UpdateNews();
        }
    }

    async UpdateNews() {
        console.log("UpdateNews called");
        const {  category, apikey, pagesize, SearchQuery } = this.props;
        const { page } = this.state;

        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apikey=${apikey}&page=${page}&pagesize=${pagesize}&q=${SearchQuery}`;
        console.log("Fetching data from URL:", url);

        this.setState({ loading: true });

        try {
            const data = await fetch(url);
            const parsedData = await data.json();

            console.log("Data fetched successfully:", parsedData);

            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchMoreData = async () => {
        console.log("fetchMoreData called");
        const {  category, apikey, pagesize, SearchQuery } = this.props;
        const { page } = this.state;

        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apikey=${apikey}&page=${page + 1}&pagesize=${pagesize}&q=${SearchQuery}`;
        console.log("Fetching more data from URL:", url);

        try {
            const data = await fetch(url);
            const parsedData = await data.json();

            console.log("More data fetched successfully:", parsedData);

            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                page: page + 1
            });
        } catch (error) {
            console.error("Error fetching more data:", error);
        }
    }

    render() {
        console.log("Render called");
        const { articles, loading } = this.state;
        const { category, mode } = this.props;
    
        return (
            <>
                <h1 className='text-center' style={{ margin: '10px 0px', marginTop: '60px', color: mode === 'dark' ? 'white' : 'black' }}>
                    News Junkie - Top {this.capitalizeFirstLetter(category)} headlines
                </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles ? articles.length : 0} // Ensure articles is defined
                    next={this.fetchMoreData}
                    hasMore={articles && articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                            {articles && articles.map((element, index) => {
                                console.log("Rendering article:", element);
                                return (
                                    <div className="col-md-3" key={index}>
                                        <Newsitem
                                            mode={mode}
                                            title={element.title ? element.title.slice(0, 44) : ""}
                                            description={element.description ? element.description.slice(0, 88) : ""}
                                            imgUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
    
}

export default News;
