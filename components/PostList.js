import React from 'react';
import s from './PostList.scss';
import PostItem from 'components/PostItem';

class PostList extends React.Component {
  constructor(){
    super();
  }

  render() {
    let list = this.props.list.map((item, index)=>{
      return <PostItem key={item.cursor} item={item.node} />
    });

    return (
        <div className={s.list}>
          {list}
        </div>
    );
  }
}

export default PostList;