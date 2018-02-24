import React from 'react';
import s from './index.scss';
import actions from '../../actions/index';
import { Link } from 'react-router-dom';

import utils from '../../../tools/utils';

class IndexPage extends React.Component {
  constructor(){
    super();
    this.state = {
      list:[]
    }
  }

  componentDidMount(){

    this.getIssues()
  }

  getIssues(page = null){
    let data = {
      query: `query {
        repository(owner:"simbawus", name: "blog") {
          issues(orderBy:{field: UPDATED_AT, direction: DESC} , first: 10, after: ${page}) {
            edges{
              cursor
              node{
                url
                title
                updatedAt
                bodyText
                number
              }
            }
          }
        }
      }`
    };

    actions.getIssues(data).then((res) => {
      let list = res.data.data.repository.issues.edges;
      page = list[(list.length - 1)].cursor;

      this.setState({
        list: list
      })

    })
  }

  _renderList(){
    return this.state.list.map((item, index) => {
      let text = utils.autoAddEllipsis(item.node.bodyText, 90);
      let date = new Date(item.node.updatedAt).format('yyyy-MM-dd');
      return <Link key={item.cursor} className={s.item} to={`/blog/new/${item.node.number}`}>
        <h6 className={s.title}>{item.node.title}</h6>
        <p className={s.summary}>{text}</p>
        <span className={s.date}>{date}</span>
      </Link>
    })
  }

  render() {
    return (
        <div className={s.container}>
          <div>
            {this._renderList()}
          </div>
        </div>
    );
  }
}

export default IndexPage;