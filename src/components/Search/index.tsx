import React, { ChangeEventHandler } from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import {GrClose} from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'


 
const Search: React.FC = React.memo(() => {
	
	
	const dispatch = useDispatch()
	const [value,setValue] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null)
	


	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};
	
	const updateSearchValue = React.useCallback(
		debounce((str)=> {
			dispatch(setSearchValue(str))
		},1000),[]);

	const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value)
	}

  return (
		<div className={styles.root}>
			
			<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48"><path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
	 <input 
	 	ref={inputRef}
		value={value}
		onChange={onChangeInput} 
		className={styles.input} 
		placeholder='Search...' />
		{value && <GrClose onClick={onClickClear} className={styles.clearIcon}/>}
	 </div>
  )
})
export default Search;