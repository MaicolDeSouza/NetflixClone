import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import FeaturedMovie from "./components/FeaturedMovie";
import MovieRow from "./components/MovieRow";
import './App.css';
import Header from "./components/Header";

export default function App() {

  // Salva a lista de filmes
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false); // Usado para informar se a cor de fundo do header sera preta ou não

  // Toda vez que a pagina for atualizada ele carrega uma nova lista
  useEffect(() => {
    const loadAll = async () => {
      // Busca a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //console.log(movieList);

      // Busca um filme para mostrar como destaque (Vamos buscar apenas originais netflix)
      let originals = list.filter(i => i.slug === "originals");
      console.log(originals);
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); // Necessaro diminuir (-1) pois o array inicia em 0
      let chosen = originals[0].items.results[randonChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
      // console.log(chosenInfo);
    }
    loadAll();
  }, []);

  // Use effect para setar se o header tera fundo preto ou nao
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) { // Se for rolado 10px deixa o header com fundo preto
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener); // Quando for identificado scroll na pagina chama a função scrollListener^
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData && //Caso tenha algum destaque chama o componente destaque para exibir
        <FeaturedMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      <footer>
        Feito com carinho por Maicol de Souza <br />
        Direitos de imagem para Netflix<br />
        Dados coletados do site tmdb.org
      </footer>

    </div>
  );
}