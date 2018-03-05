import React from 'react';
import s from './index.scss';
import actions from '../../actions/index';
import { Link, browserHistory } from 'react-router-dom';

import utils from '../../../tools/utils';

class IndexPage extends React.Component {
  constructor(){
    super();
    this.state = {
      labels: [],
      list: [],
      currentLabel: 'New'
    };

    this.chooseLabel = this.chooseLabel.bind(this);
  }

  componentDidMount(){
    document.title = '个人博客 - 吴胜斌 | simbawu';

    let currentLabel = this.props.match.params.type;

    this.getIssues(currentLabel);
  }

  getIssues(label = 'New', page = null){
    let data = {};
    if(label == 'New'){
      data = {
        query: `query {
          repository(owner:"simbawus", name: "blog") {
            issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: null, first: 10, after: ${page}) {
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
            labels(first: 100){
              nodes{
                name
              }
            }
          }
        }`
      };
    }else {
      data = {
        query: `query {
        repository(owner:"simbawus", name: "blog") {
          issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: "${label}", first: 10, after: ${page}) {
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
          labels(first: 100){
            nodes{
              name
            }
          }
        }
      }`
      };
    }

    actions.getIssues(data).then((res) => {
      let labels = res.data.data.repository.labels.nodes.map((item, index) => {
        return item.name
      });

      labels.unshift('New');

      let list = res.data.data.repository.issues.edges;
      page = list[(list.length - 1)].cursor;

      this.setState({
        labels: labels,
        list: list,
        currentLabel: label
      })

    })
  }

  _renderLabels(){
    return this.state.labels.map((item, index) => {
      return <li key={item} onClick={() => this.chooseLabel(item)}>
        <span className={item == this.state.currentLabel ? s.current : ''}>{item}</span>
      </li>
    })
  }

  _renderList(){
    return this.state.list.map((item, index) => {
      let text = utils.autoAddEllipsis(item.node.bodyText, 90);
      let date = new Date(item.node.updatedAt).format('yyyy-MM-dd');
      return <Link key={item.cursor} className={s.item} to={`/blog/${this.state.currentLabel}/${item.node.number}`}>
        <h6 className={s.title}>{item.node.title}</h6>
        <p className={s.summary}>{text}</p>
        <span className={s.date}>{date}</span>
      </Link>
    })
  }

  chooseLabel(currentLabel){
    this.props.history.push(`/blog/${currentLabel}`);

    this.getIssues(currentLabel);

    this.setState({
      currentLabel: currentLabel
    });

  }

  render() {
    return (
        <div className={s.container}>
          <ul className={s.labels}>
            {this._renderLabels()}
          </ul>
          <div className={s.list}>
            {this._renderList()}
          </div>
        </div>
    );
  }
}

export default IndexPage;