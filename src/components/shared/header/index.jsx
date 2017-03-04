import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1><Link href="/">App</Link></h1>
				<div class={style.search}><input type="text" placeholder="Search..."/></div>
				<nav>
					<Link href="/login">Login</Link>
				</nav>
			</header>
		);
	}
}
