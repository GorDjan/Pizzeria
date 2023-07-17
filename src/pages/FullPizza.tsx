import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
	const [pizza,setPizza] = React.useState<{
		imageUrl:string,
		title: string,
		price:number
	}>()
	const {id} = useParams()
	const navigate = useNavigate()
	React.useEffect(()=> {
		async function fetchPizza () {
			try {
			const{data} = await	axios.get(`https://646bba6e7d3c1cae4ce436d5.mockapi.io/items/`+ id)
				setPizza(data)
			} catch (error) {
				alert('Error when getting pizzas!')
				navigate('/')
			}
		}
		fetchPizza()
	},[])
	
  if(!pizza){
		return <>Loading...</>
		
  }else{
	return (
		<div className='container'>
		  <img src={pizza.imageUrl} alt="" className="src" />
		  <h2>{pizza.title}</h2>
		  
		  <h4>{pizza.price} $</h4>
		  
		  <Link to="/">
				<button   className="button button--outline button--add">
						<span>Back</span>
				</button>
		  </Link>
		  
	  </div>
	 )
  }
}

export default FullPizza