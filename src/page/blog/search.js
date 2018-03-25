import React from 'react';
import s from './search.scss';
import Actions from 'actions';
import { Link, browserHistory } from 'react-router-dom';
import Header from 'components/Header';
import PostList from 'components/PostList';

import utils from '../../../tools/utils';

class SearchPage extends React.Component {
  constructor(){
    super();
    this.state = {
      list: []
    };
  }

  componentDidMount(){
    let keyWords = utils.getParameterByName('keyWords');
    document.title = `${keyWords} - 个人博客 - 吴胜斌 | simbawu`;
    this.getIssues(keyWords);
  }

  getIssues(keyWords){
    let data = {
      query: `query {
        search(query:"${keyWords} repo:simbawus/blog", type: ISSUE, first: 10) {
          issueCount
          edges{
            cursor
            node{
              ... on Issue {
                title
                number
                bodyText
                updatedAt
              }
            }
          }
        }
      }`
    };

    Actions.getIssues(data).then((res) => {
      let list = res.data.data.search.edges;
      this.setState({
        list: list
      })
    })
  }

  render() {
    return (
        <div className={s.container}>
          <Header />
          <PostList list={this.state.list} />
        </div>
    );
  }
}

export default SearchPage;