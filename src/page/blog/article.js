import React from 'react';
import s from './article.scss';
import actions from '../../actions/index';
import { Link } from 'react-router-dom';
import utils from '../../../tools/utils';
import 'github-markdown-css';

class ArticlePage extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      updatedAt: '',
      markdown: ''
    }
  }

  componentDidMount(){
    let articleId = this.props.match.params.articleId;
    this.getIssue(articleId)
  }

  getIssue(articleId){
    let data = {
      query: `query {
        repository(owner:"simbawus", name: "blog") {
          issue(number: ${articleId}) {
            title
            updatedAt
            bodyHTML
          }
        }
      }`
    };

    actions.getIssues(data).then((res) => {
      let issue = res.data.data.repository.issue;

      document.title = `${issue.title} - 个人博客 - 吴胜斌 | simbawu`;

      this.setState({
        title: issue.title,
        updatedAt: new Date(issue.updatedAt).format('yyyy-MM-dd'),
        markdown: issue.bodyHTML
      })

    })
  }

  _renderHTML(){
    return { __html: this.state.markdown };
  }

  render() {
    return (
        <div className={s.markdown}>
          <h1 className={s.title}>{this.state.title}</h1>
          <p className={s.date}>{this.state.updatedAt}</p>
          <div className='markdown-body' dangerouslySetInnerHTML={this._renderHTML()}>

          </div>
        </div>
    );
  }
}

export default ArticlePage;