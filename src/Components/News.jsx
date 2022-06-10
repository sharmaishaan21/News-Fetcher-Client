//import React, { Component } from 'react'
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0)
    //document.title = `${ props.category} - NewsMonkey`;
    const updateNews = async () => {
        console.log("cdm");
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${props.category} - NewsMonkey`;
        updateNews();
    }, [])
    const handlePreviousClick = async () => {
        setPage(page - 1);
        updateNews();
    }
    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        await delay(1000);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults);
    };

    const delay = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        })
    }

    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ marginTop: "80px", marginBottom: "40px" }}>News-fetcher top headlines from {props.category}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles?.map((element) => {
                            return (<div className="col-md-4 my-4" key={element.url} >
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.title.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>)
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
