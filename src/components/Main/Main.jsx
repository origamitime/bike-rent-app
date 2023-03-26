import MainPicture from '../../assets/bicycle.jpg';
import css from './Main.module.scss'

export const Main = () => {
    return (
      <main className={css.main}>
        <div className={css.aside}>
          <h1 className={css.asideHeader}>Учет угона велопроката</h1>
          <p className={css.asideText}>Наша система позволяет прокатным компаниям контролировать угон велосипедов и своевременно реагировать на пропажи. 
            С помощью нашего сервиса вы можете отслеживать местоположение велосипедов, получать уведомления о необычных движениях и быстро находить пропавшие велосипеды. 
            Защитите свой бизнес и обеспечьте безопасность своим клиентам с нашей системой контроля за пропажами велосипедов из проката.</p>
        </div>
        <div><img src={MainPicture}/></div>
      </main>
    );
  }