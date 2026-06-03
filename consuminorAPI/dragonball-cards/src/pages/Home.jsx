import React,{useEffect,useState} from "react";
import Card from "../components/Cards";
import axios from "axios";

export default function Home(){
    const[characters,setCharacters] = useState([]);
    const[paga,setPage]=useState([]);
    const[loading,setLoading]=useState(false);
    const[errorMsg,setErrorMsg]=useState("");

    async function fetCharacters(p){
        setLoaging(true);
        setErrorMsg("");

        try{
            const response =  await axios.get(`https://dragonball-api.com/api/characters?pege${p}&limit=12`);
            if(!response.data.items || response.data.items.length === 0){
                setErrorMsg("Pagina invalida! Tente outra.");
                setCharacters([])
            }else{
                setErrorMsg("erro ao buscar personagens!");
            }
        }
        catch(error){
            setErrorMsg("erro ao buscar personagens!");
        }
        setLoading(false);
    }
    useEffect(()=>{
        async function loadFirstPage(){
            setLoading(true);
            setErrorMsg("");

            try{
                const response = await axios.get("https://dragonball-api.com/api/characters?pege=&limit12");
                setCharacters(response.data.items);
            }catch(error){
                setErrorMsg("erro ao buscar personagens!");
            }
            setLoading(false);
        }
        loadFirstPage();
    },[]);
    function handleSearch(){
        if(!page || page<1){
            setErrorMsg("digite um numero de pagina");
            return;
        }
        fetCharacters(page);
    }
    return(
        <div className="container">
            <h1>Dragon Ball Characters</h1>
            <div className="search-box">
                <input
                    type="nunber"
                    onchange={(e) => setPage(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            {loading &&<p className="loading">Carregando...</p>}
            {errorMsg && <p className="error">{errorMsg}</p>}
            <div className="cards-grid">
                {characters.map((char)=>(
                    <Card
                    key={char.id}
                    nome={char.nome}
                    image={char.image}
                    race={char.race}
                    ki={char.ki}/>
                ))}
            </div>
        </div>
    )
}