import React from 'react';
import s from './index.scss';
import { Link } from 'react-router-dom';

class IndexPage extends React.Component {
	constructor(){
		super();
	}

	render() {
		return (
			<div className={s.container}>
				Hello World
				<Link to='/blog'>blog</Link>
			</div>
		);
	}
}

export default IndexPage;