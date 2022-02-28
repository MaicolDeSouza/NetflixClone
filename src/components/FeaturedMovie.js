import { logDOM } from "@testing-library/react";
import React from "react";
import "./FeaturedMovie.css";

export default function FeaturedMovie({ item }) {
    //console.log(item);
    let firstDate = new Date(item.first_air_date); // Pega a data de lancamento do filme para extrair o ano depois (firstDate.getFullYear)
    let genres = []; // Para salvar os generos
    for(let i in item.genres){ // Percorre todoos os objetos de genres   
        genres.push(item.genres[i].name); // Salva no array genres apenas o nome do genero para exibir depois
    }

    // Funcao para cortar a descrição e adicionar "..." ao final se tiver + que 200 caracteres
    let description = item.overview;
    if (description.length > 200){
        description = description.substring(0, 200) + '...'; 
    }

    return (
        //Usado style para buscar a imagem, pois necessario usar a prop "item" para manter o programa dinamico
        <section className="featured" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
        
           
            <div className="featured--vertical">
                <div className="featured--horizontal" >
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : '' /*Caso tenha apenas 1 temporada nao adiciona o "s" */}</div> 
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton" >► Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton" >+ Minha lista</a>
                    </div>
                    <div className="featured--genres"><strong>Generos: </strong>{genres.join(', ') /*Para cada item de array adiciona uma "," */}</div>
                </div>
            </div>
        </section>

    );

}