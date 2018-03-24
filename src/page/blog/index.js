import React from 'react';
import s from './index.scss';
import actions from '../../actions/index';
import { Link, browserHistory } from 'react-router-dom';
import Header from 'components/Header';

import utils from '../../../tools/utils';

class IndexPage extends React.Component {
  constructor(){
    super();
    this.state = {
      labels: [],
      list: [],
      currentLabel: 'New',
      opacity: 1,
      headerFixed: false
    };

    this.localState = {
      startX: 0,
      startY: 0,
      startT: 0,
      isMove: false,
      isTouchEnd: true,
      initTab: 0,
      currentTab: 0,
      direction: 'left'
    };

    this.chooseLabel = this.chooseLabel.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.handleLabelIndex = this.handleLabelIndex.bind(this);
    this.handleOpacity = this.handleOpacity.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount(){
    document.title = '个人博客 - 吴胜斌 | simbawu';
    window.addEventListener('scroll', this.handleOnScroll);
    let currentLabel = this.props.match.params.type;
    this.getIssues(currentLabel || 'New');
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  getIssues(label = 'New', page = null){
    let data = {};
    this.localState.initLabel = label;
    if(label == 'New' || !this.state.labels.includes(label)){
      label = 'New';
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
        currentLabel: label,
        opacity: 1
      })

    })
  }

  _renderLabels(){
    return this.state.labels.map((item, index) => {
      return <li key={item} onClick={() => this.chooseLabel(item)}>
        <div className={item == this.state.currentLabel ? s.current : ''}>
          <p>{item}</p>
        </div>
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
        <p className={s.date}>{date}</p>
      </Link>
    })
  }

  chooseLabel(currentLabel){
    this.props.history.push(`/blog/${currentLabel}`);
    this.getIssues(currentLabel);
  }

  touchStart(e){
    // e.preventDefault();
    if(e.touches.length == 1 || this.localState.isTouchEnd){
      let touch = e.touches[0];
      this.localState.startX = touch.pageX;
      this.localState.startY = touch.pageY;
      this.localState.initTab = this.state.currentTab;   //本次滑动前的初始位置
      this.localState.startT = new Date().getTime(); //记录手指按下的开始时间
      this.localState.isMove = false; //是否产生滑动
      this.localState.isTouchEnd = false; //当前开始滑动
    }
  }

  touchMove(e){
    // e.preventDefault();
    let touch = e.touches[0];
    let deltaX = touch.pageX - this.localState.startX;
    let deltaY = touch.pageY - this.localState.startY;
    //如果X方向上的位移大于Y方向，则认为是左右滑动
    if (Math.abs(deltaX) > Math.abs(deltaY)){
      if ((this.handleLabelIndex(this.state.currentLabel) > 0 && deltaX > 0) || (this.handleLabelIndex(this.state.currentLabel) <= (this.state.labels.length - 2) && deltaX < 0)){
        //移动页面
        this.handleOpacity(0.2);
        this.localState.isMove = true;
      }
      this.localState.direction = deltaX > 0 ? "right" : "left"; //判断手指滑动的方向
    }
  }

  touchEnd(e){
    // e.preventDefault();
    //计算手指在屏幕上停留的时间
    let deltaT = new Date().getTime() - this.localState.startT;
    let index = 0;
    if (this.localState.isMove){ //发生了左右滑动
      //使用动画过渡让页面滑动到最终的位置
      if(deltaT < 300){ //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
        index = this.localState.direction == 'left'? 1 : -1;

      }else {
        //如果滑动距离小于屏幕的50%，则退回到上一页
        if (Math.abs(this.localState.moveLength)/this.localState.pageWidth < 0.5){
          translate = this.localState.currentPosition-this.localState.moveLength;

          index = 0

        }else{
          //如果滑动距离大于屏幕的50%，则滑动到下一页
          index = this.localState.direction == 'left'? 1 : -1;
        }
      }

      this.chooseLabel(this.state.labels[this.handleLabelIndex(this.state.currentLabel) + index]);

    }
  }

  handleOpacity(opacity){
    this.setState({
      opacity: opacity
    })
  }

  handleLabelIndex(label){
    return this.state.labels.indexOf(label)
  }

  handleOnScroll(){
    let scrollY =  window.scrollY;
    if(scrollY > 50){
      this.setState({
        headerFixed: true
      })
    }else {
      this.setState({
        headerFixed: false
      })
    }
  }

  render() {
    return (
        <div className={s.container}>
          <Header />
          <div className={`${s.box} ${this.state.headerFixed ? s.headerFixed : ''}`} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
            <ul className={s.labels}>
              {this._renderLabels()}
            </ul>
            <div className={s.list} style={{opacity: this.state.opacity}} >
              {this._renderList()}
            </div>
          </div>
        </div>
    );
  }
}

export default IndexPage;