import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components";
import SearchResult from './Components/searchResult/SearchResult';


export const BASE_URL = ('http://localhost:9000')



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterData, setFilterData] = useState(null)
  const [selectedBtn, setSelectBtn] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json)
        setFilterData(json)
        setLoading(false)
      } catch (error) {
        setError("Unable to fetch data")
      }
    }
    fetchFoodData()
  }, []);
  console.log(data)


  // search Functionality 

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilterData(null)
    }
    const filter = data?.filter((food) => {
      return food.name.toLowerCase().includes(searchValue.toLowerCase())
    });
    setFilterData(filter);
  };

  const filterFood = (type)=>{
    if(type==="all"){
      setFilterData(data);
      setSelectBtn("all")
      return;
    }
    const filter = data?.filter((food)=>
       food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter)
  };
  const filterBtns = [
    {
      name:"All",
      type:"all",
    },
    {
      name:"Breakfast",
      type:"breakfast",
    },
    {
      name:"Lunch",
      type:"lunch",
    },
    {
      name:"DInner",
      type:"dinner",
    }
  ]
  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>



  return (
    <>
      <Container>
        <TopContainer>
          <div className='logo'>
            <img src='/Foody Zone.svg' alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder='Search Food' />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value)=>(
              <Button key={value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>

            ))}
          
         
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>

  )
}

export default App

const Container = styled.div`
max-width:1200px;
margin:0 auto; 
`;

const TopContainer = styled.section`
  min-height:50px;
  display:flex;
  justify-content:space-between;
  padding:16px;
  align-center:center;

  .search{
     input{
       background-color:transparent;
       border:1px solid red;
       color:#fff;
       border-radius:5px;
       height:40px;
       font-size:16px;
       padding:0 10px;
     } 
  }
  
  @media (0 < width < 600px){
    flex-direction:column;
    align-items : center;
    justify-content:center;
  }
`;
const FilterContainer = styled.section`
  display:flex;
  justify-content:center;
  gap:12px;
  padding:40px;
`;

export const Button = styled.button`
  background:#ff4343;
  border-radius:5px;
  padding:6px 12px;
  border:none;
  color:#fff;
  cursor:pointer;
`;

