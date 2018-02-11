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
        more: '更多关于我的信息，请见下方。'
      }
		};

		this.getLanguage = this.getLanguage.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
	}

	componentDidMount(){
    this.getLanguage()
	}

	getLanguage(){
	  if(!(/zh/.test(navigator.language))){
      this.changeLanguage(false)
    }
  }

  changeLanguage(chinese){
	  if(chinese){
      this.setState({
        chinese: chinese,
        introduce: {
          welcome: '朋友，你好！',
          name: '我是吴胜斌',
          work: '目前在上海担任前端工程师',
          more: '更多关于我的信息，请见下方。'
        }
      })
    }else {
      this.setState({
        chinese: chinese,
        introduce: {
          welcome: 'Hi Friend,',
          name: 'I’m Simba Wu.',
          work: 'A Front End Developer in Shanghai.',
          more: 'More about me at the bottom.'
        }
      })
    }
  }


	render() {
		return (
			<div className={s.container}>
				<div className={s.photo}>
          <button className={s.languageBtn} onClick={() => this.changeLanguage(!this.state.chinese)}>中 / EN</button>
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
            <a href="https://github.com/simbawus">
              <i className='iconfont'>&#xe600;</i>
            </a>
            <Link to='/blog'>
              <i className='iconfont'>&#xe70f;</i>
            </Link>
          </div>
				</div>
			</div>
		);
	}
}

export default IndexPage;