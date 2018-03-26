import React from 'react';
import s from './index.scss';
import { Link } from 'react-router-dom';

class IndexPage extends React.Component {
	constructor(){
		super();
		this.state = {
      chinese: true,
      introduce: {
        welcome: '朋友，你好！',
        name: '我是吴胜斌',
        work: '目前在上海担任前端工程师',
        more: '更多关于我的信息，请见下方。',
        blog: '博客'
      }
		};

		this.getLanguage = this.getLanguage.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.gotoUrl = this.gotoUrl.bind(this);
	}

	componentDidMount(){
    this.getLanguage();
	}

	getLanguage(){
	  if(!(/zh/.test(navigator.language))){
      this.changeLanguage({}, false)
    }
  }

  changeLanguage(e, chinese){
	  e.stopPropagation && e.stopPropagation();
	  if(chinese){
      this.setState({
        chinese: chinese,
        introduce: {
          welcome: '朋友，你好！',
          name: '我是吴胜斌，',
          work: '目前在上海从事Web前端开发工作，',
          more: '更多关于我的信息，请见下方。',
          blog: '博客'
        }
      })
    }else {
      this.setState({
        chinese: chinese,
        introduce: {
          welcome: 'Hi Friend,',
          name: 'I’m Simba Wu.',
          work: 'A Front End Developer in Shanghai.',
          more: 'More about me at the bottom.',
          blog: 'Blog'
        }
      })
    }
  }


  gotoUrl(){
	  this.props.history.push('/blog')
  }


	render() {
		return (
			<div className={s.container}>
				<div className={s.photo} onClick={this.gotoUrl}>
          <Link className={s.blogBtn} to='/blog'>{this.state.introduce.blog}</Link>
          <button className={s.languageBtn} onClick={(e) => this.changeLanguage(e, !this.state.chinese)}>中 / EN</button>
        </div>
				<p className={`${s.slogan} ${this.state.chinese && s.chineseSlogan}`}></p>
				<div className={s.about}>
          <div className={s.introduce}>
            <p className={s.welcome}>{this.state.introduce.welcome}</p>
            <div>
              {this.state.introduce.name}<br/>{this.state.introduce.work}<br/>{this.state.introduce.more}
            </div>
          </div>
          <div className={s.link}>
            <div className={s.icon_link}>
              <a href="https://github.com/simbawus" target="_blank">
                <i className={`iconfont ${s.icon_github}`}>&#xe600;</i>
              </a>
              <a href="https://www.zhihu.com/people/wusb/activities" target="_blank">
                <i className={s.icon_zhihu}>知</i>
              </a>
            </div>
            <div className={s.word_link}>
              <Link to='/blog'>Blog</Link>
              <a href="https://juejin.im/user/59cd9cb8518825745c637de0/activities" target="_blank">掘金</a>
              <a href="https://www.jianshu.com/u/54986e6d5fa7" target="_blank">简书</a>
              <a href="https://segmentfault.com/u/simbawu" target="_blank">segmentfault</a>
            </div>
          </div>
				</div>
			</div>
		);
	}
}

export default IndexPage;