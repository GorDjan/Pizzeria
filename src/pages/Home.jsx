import React from 'react';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { SearchContext } from '../App';

import {useSelector,useDispatch} from 'react-redux'
import { setCategoryId,setCurrentPage,setFilters} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)
	const {categoryId,sort,currentPage} = useSelector((state) => state.filter)
	const {items,status} = useSelector((state) => state.pizza)


	const {searchValue} = React.useContext(SearchContext)
	const onChangeCategry =(id)=> {
		dispatch(setCategoryId(id))
	}
	const onChangePage =(number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-','');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		
			dispatch(
				fetchPizzas({
						order,
						sortBy,
						category,
						search,
						currentPage
			}))
		 
	}
	
React.useEffect(()=> {
		if(isMounted.current){
			const queryString = qs.stringify({
				sortProperty:sort.sortProperty,
				categoryId,
				currentPage
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
},[categoryId,sort.sortProperty,currentPage])


React.useEffect(()=> {
			if(window.location.search){
					const params = qs.parse(window.location.search.substring(1))
					const sort = sortList.find(obj=>obj.sortProperty === params.sortProperty)
					dispatch(setFilters({
						...params,sort
					}

					))
					isSearch.current = true
				}
	},[])
	
	
React.useEffect(()=> {
				window.scrollTo(0,0)

					if(!isSearch.current){
						getPizzas()
					}

				isSearch.current = false
},[categoryId,sort.sortProperty,searchValue,currentPage])




const pizzas = items.map((obj) => 
<PizzaBlock key={obj.id} {...obj}/>)

const skeletons = [...new Array(8)].map((_,index) => <Skeleton key= {index}/>)

  return (
	<div className="container">
		<div className="content__top">
					<Categories value ={categoryId} onChangeCategory={onChangeCategry}/>
					<Sort  />
		</div>

          <h2 className="content__title">Все пиццы</h2>
			 {
				status=== 'error' ?
				 <div className='content_error_info'>
					<h2>Произошла ошибка 😕</h2>
					
				 </div> 
					:<div className="content__items">
        		 {status === 'loading' ? skeletons : pizzas}	
          </div>
			 }
          
			 <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
	</div>
  )
}
