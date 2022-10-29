import starEmpty from '../../../assets/svg/star-line-yellow.svg';
import starFull from '../../../assets/svg/star.svg';
import starHalf from '../../../assets/svg/star-half-yellow.svg';
import noProduct from '../../../assets/images/no-product.jpeg';

export default function Card({gameClick, item, listTableStatus }) {

const gameRating = (item.sum / item.count || 1).toFixed(2);

const getStars = () => {
  const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (i<= gameRating ) {
          stars.push(<img alt="star" key={i + 'f'}  src={starFull} />)
      }  if (i< gameRating && gameRating < (i + 1)) {
          stars.push(<img alt="star" key={i + 'h'} src={starHalf} />)
      } if (i> gameRating && gameRating < (i + 1)) {
          stars.push(<img alt="star" key={i + 'e'}  src={starEmpty} />)
      }
    }
  return stars;
};

  return(
        
    <div  onClick={() =>gameClick(item.id)} className={`${listTableStatus ? 'card-column' : 'card-row '}`} >
      <div className='card-text' >
        <h3>{item.title} </h3>
        <h4>{['PC', 'PlayStation', 'Xbox', 'Nintendo'][item.category - 7]}</h4>
        <h6>{['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Puzzle'][item.type - 1]}</h6>
        <h5>{getStars()}</h5>
      </div>    
      <div className='card-img'>
        <img className='img' src={item.photo !== null ? item.photo : noProduct} alt="game" />
      </div>
    </div>
  )
}