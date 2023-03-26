import css from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={css.footer}>
			<div className={css.signature}>
				Created by <a href='https://github.com/art-mlnk' target='_blank' rel='noreferrer'>Artem Melnikov</a>, 2023
			</div>
		</footer>
  );
}