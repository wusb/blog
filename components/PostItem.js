import React from 'react';
import s from './PostItem.scss';
import { Link } from 'react-router-dom';
import utils from "../tools/utils";

class PostItem extends React.Component {
  constructor(){
    super();
    this.state = {

    };
  }

  componentDidMount(){

  }

  render() {
    let item = this.props.item;
    let text = utils.autoAddEllipsis(item.bodyText, 90);
    let date = new Date(item.updatedAt).format('yyyy-MM-dd');

    return (
        <Link key={item.number} className={s.item} to={`/article/search/${item.number}`}>
          <h6 className={s.title}>{item.title}</h6>
          <p className={s.summary}>{text}</p>
          <p className={s.date}>{date}</p>
        </Link>
    );
  }
}

export default PostItem;