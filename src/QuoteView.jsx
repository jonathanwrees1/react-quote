import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import randomColor from 'randomcolor';

import './QuoteView.css';

export default class QuoteView extends Component {
  state = {
    quotes: [],
    index: 0,
    bgColor: 'blue',
  };

  componentDidMount() {
    axios.get('https://type.fit/api/quotes').then((response) => {
      this.setState({ quotes: response.data }, this.getRandomIndex);
    });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({ index });
    }
  };

  colorChange = (e) => {
    let color = randomColor();
    this.setState({
      bgColor: color,
    });
  };

  render() {
    const { quotes, index } = this.state;
    const newQuote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet/?text="${
      newQuote && newQuote.text
    }"
    -${newQuote && newQuote.author}`;
    const tweetURLNoAuthor = `https://twitter.com/intent/tweet/?text="${
      newQuote && newQuote.text
    }"
    -Anonymous`;

    return (
      <div>
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
        />
        <div id='wrapper' style={{ backgroundColor: this.state.bgColor }}>
          <Card className='card' id='quote-box'>
            <Card.Body className='card-body'>
              <div id='quote-info-wrapper'>
                {newQuote && ( //short circuit operator to check if a quote is present before executing any more code
                  <>
                    <div id='quote-text'>
                      <i
                        className='fa fa-quote-left'
                        style={{ color: this.state.bgColor }}
                      ></i>
                      &nbsp;
                      <span
                        id='text'
                        className='card-title'
                        style={{ color: this.state.bgColor }}
                      >
                        {newQuote.text}&nbsp;
                      </span>
                      <i
                        className='fa fa-quote-right'
                        style={{ color: this.state.bgColor }}
                      ></i>
                    </div>

                    {newQuote && newQuote.author === null ? ( //ternary operator checking if author exist or not
                      <div id='quote-author'>
                        <cite
                          id='author'
                          className='d-block text-right'
                          style={{ color: this.state.bgColor }}
                        >
                          -Anonymous
                        </cite>
                      </div>
                    ) : (
                      <div id='quote-author'>
                        <cite
                          id='author'
                          className='d-block text-right'
                          style={{ color: this.state.bgColor }}
                        >
                          -{newQuote.author}
                        </cite>
                      </div>
                    )}
                  </>
                )}
              </div>
              <Button
                id='new-quote'
                className='btn btn-primary'
                onClick={() => {
                  this.getRandomIndex();
                  this.colorChange();
                }}
                style={{ backgroundColor: this.state.bgColor }}
              >
                Get Quote
              </Button>
              {newQuote && newQuote.author === null ? (
                <a
                  title='Tweet this quote!'
                  id='tweet-quote'
                  rel='noreferrer'
                  target='_blank'
                  href={tweetURLNoAuthor}
                  className='btn btn-primary'
                  style={{ backgroundColor: this.state.bgColor }}
                >
                  <i className='fa fa-twitter'></i> Tweet
                </a>
              ) : (
                <a
                  title='Tweet this quote!'
                  id='tweet-quote'
                  rel='noreferrer'
                  target='_blank'
                  href={tweetURL}
                  className='btn btn-primary'
                  style={{ backgroundColor: this.state.bgColor }}
                >
                  <i className='fa fa-twitter'></i> Tweet
                </a>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
