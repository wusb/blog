import React from 'react';
import s from './Header.scss';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(){
    super();
    this.state = {
      menus:[{
        name: '首页',
        url: '/index'
      },{
        name: 'Blog',
        url: '/blog'
      }],
      keyword: '',
      searchBoxFull: false
    };

    this._renderMenus = this._renderMenus.bind(this);
    this.handleSearchBox = this.handleSearchBox.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){

  }

  _renderMenus(){
    return this.state.menus.map((menu, index) => {
      let currentMenu = new RegExp(menu.url).test(location.pathname) ? menu.url : '';
      return (
          <Link key={index} className={`${s.menu} ${currentMenu == menu.url ? s.currentMenu :''}` } to={menu.url}>{menu.name}</Link>
      )
    })
  }

  handleSearchBox(state){
    this.setState({
      searchBoxFull: state
    })
  }

  handleInput(e){
    let keyword = e.target.value;
    this.setState({
      keyword: keyword
    })
  }

  handleSearch(e){
    e.preventDefault();
    let keyWords = this.state.keyword;
    this.props.history.push(`/search?keyWords=${keyWords}`);
  }

  render() {
    return (
        <div className={s.container}>
          <div className={`${s.header} ${this.state.searchBoxFull ? s.searchBoxFull : ''}`}>
            <div className={s.menuList}>
              {this._renderMenus()}
            </div>
            <form className={s.searchBox} onSubmit={this.handleSearch}>
              <input type="srarch" placeholder='搜索' onChange={this.handleInput} onFocus={() => this.handleSearchBox(true)} onBlur={() => this.handleSearchBox(false)}/>
              <i className='iconfont' onClick={this.handleSearch}>&#xe605;</i>
            </form>
          </div>
        </div>
    );
  }
}

export default withRouter(Header);