import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {


    static propTypes = {
        pagesize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }


    static defaultProps = {
        pagesize: 8,
        country: "in",
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
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-News Junkie`
    }
    async componentDidMount() {
        await this.UpdateNews();

    }

    async componentDidUpdate(prevProps) {

        if (prevProps.SearchQuery !== this.props.SearchQuery) {
            this.setState({
                page: 1
            })

            await this.UpdateNews();
        }
    }


    async UpdateNews() {
        this.props.setProgress(3)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}&q=${this.props.SearchQuery}`
        this.setState({ loading: true })
        this.props.setProgress(35)
        let data = await fetch(url);
        this.props.setProgress(50)
        let parsedData = await data.json();
        this.props.setProgress(80)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100)
    }

    fetchMoreData=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}&q=${this.props.SearchQuery}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            page:this.state.page+1
        });
    }





    render() {
        return (
            <>
                <h1 className='text-center ' style={{ margin: '10px 0px', marginTop:'60px',color:this.props.mode==='dark'?'white':'black' }}>News Junkie - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
                {this.state.loading&& <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row" style={{color:this.props.mode==='dark'?'white':'black'}}>
                        { this.state.articles.map((element,index) => {
                            return <div className="col-md-3 style={{color:this.props.mode==='dark'?'white':'black'}}" key={index}>
                                <Newsitem mode={this.props.mode} title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
