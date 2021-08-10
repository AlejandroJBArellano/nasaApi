import React from 'react';
import INasaArticle from "../interfaces/INasaArticle"

export default function NasaArticle(props:INasaArticle) {
    const { date, explanation, title, urlImage } = props
    return <section>
        <article>{date}</article>
        <article>{explanation}</article>
        <article>{title}</article>
        <img src={urlImage} alt="" />
    </section>
}
