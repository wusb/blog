import React from 'react';
import s from './index.scss';
import { Link } from 'react-router-dom';

class IndexPage extends React.Component {
	constructor(){
		super();
		this.state = {

		}
	}

	componentDidMount(){

	}


	render() {
		return (
			<div className={s.container}>
				<div className={s.photo}></div>
				<p className={s.slogan}></p>
				<div className={s.introduce}>
          <div className={s.welcome}>
            <p>Hi Friend,</p>
            <div>
              I’m Simba Wu.<br/> A Front End Developer in Shanghai.<br/>More about me at the bottom.
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