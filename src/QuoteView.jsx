import React, { Component } from 'react';
import axios from 'axios';

import { Row, Col, Container, Card, Button } from 'react-bootstrap';

import './QuoteView.css';

export default class QuoteView extends Component {
  state = {
    quotes: [],
    index: 0,
    bgColor: 'blue',
  };

  componentDidMount() {
    axios
      .get('https://type.fit/api/quotes')
      .then((response) => {
        this.setState({ quotes: response.data }, this.getRandomIndex);
      })
      .catch((err) => {
        this.setState(
          {
            err,
          },
          this.errorMessage
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({ index });
    } else {
      this.setState(this.errorMessage);
    }
  };

  errorMessage = () => {
    alert('Hmm....something is wrong with the server');
  };

  colorChange = () => {
    let color = [
      'rgb(221, 22, 115)',
      'rgb(219, 92, 153)',
      'rgb(153, 24, 56)',
      'rgb(36, 36, 209)',
      'rgb(216,151,91)',
      'rgb(249,134,136)',
      'rgb(169,145,255)',
      'rgb(74,71,211)',
      'rgb(237,144,101)',
      'rgb(13,147,125)',
      'rgb(224,13,161)',
      'rgb(191,59,87)',
      'rgb(56,165,13)',
      'rgb(2,114,209)',
      'rgb(143,181,41)',
      'rgb(209,6,188)',
      'rgb(67,12,135)',
      'rgb(201,63,56)',
      'rgb(121,137,242)',
      'rgb(12,137,110)',
      'rgb(216,132,101)',
      'rgb(54,159,170)',
      'rgb(2,21,109)',
      'rgb(4,112,15)',
      'rgb(59,88,155)',
      'rgb(193,21,75)',
      'black',
    ];
    let randomColor = color[Math.floor(Math.random() * color.length)];
    this.setState({
      bgColor: randomColor,
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
      <div
        style={{
          background: `linear-gradient(45deg,#cfd1d1,${this.state.bgColor},${this.state.bgColor},#cfd1d1)`,
        }}
      >
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
        />
        <Container className='col-md-7 col-10'>
          <Row>
            <Col>
              <h1 className='heading d-flex justify-content-center display-3 text-center '>
                Random Quote Generator
              </h1>
            </Col>
          </Row>
        </Container>

        <Container className='quote-container vh-100 d-flex justify-content-center col-xl-4 col-lg-5 col-md-7 col-10'>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
