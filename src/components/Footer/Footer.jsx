import css from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={css.footer}>
			<div className={css.signature}>
				<p>Created by <a href='https://github.com/art-mlnk' target='_blank' rel='noreferrer' className={css.link}>Artem Melnikov</a>, 2023</p>
			</div>
		</footer>
  );
}