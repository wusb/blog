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
				<div className={s.introduce}>
					<p>Hi Friend,</p>
					<div>
            I’m Simba Wu.<br/> a Front End Developer in Shanghai.
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
		);
	}
}

export default IndexPage;