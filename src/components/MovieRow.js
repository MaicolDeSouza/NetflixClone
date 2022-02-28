import React, { useState } from "react";
import './MovieRow.css';
//import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
//import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'



export default function MovieRow({ title, items }) {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2); // Cada vez que for clicado desloca a lista para metade da tela do usuario
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2); // Cada vez que for clicado desloca a lista para metade da tela do usuario
        let listWidth = items.results.length * 150;          // Calculamos a largura total da lista
        if ((window.innerWidth - listWidth) > x) {          // Verificamos se a lista que falta mostrar é maior que a tela do usuario
            x = (window.innerWidth - listWidth) - 60       // o -60 se refere ao espaço nos extremos para mostrar a capa do filme inteiro
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            {console.log(items)}
            <div className="movieRow--left" onClick={handleLeftArrow} > <NavigateBeforeIcon style={{ fontSize: 50 }} /> </div>

            <div className="movieRow--right" onClick={handleRightArrow}> <NavigateNextIcon style={{ fontSize: 50 }} /> </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX, // Movimenta  a lista para esq ou dir conforme valor do scrollX
                    width: items.results.length * 150 // A largura total da lista vai ser o numero de items * o tamanho da imagem definida para cada capa
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_name} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}