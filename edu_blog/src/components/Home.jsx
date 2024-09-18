// Home.jsx
import React from 'react';
import Slider from 'react-slick'; 
import './Home.css'; 
import foto1 from '../assets/images/foto1.jpg'; 
import foto2 from '../assets/images/foto2.jpg';
import foto3 from '../assets/images/foto3.jpg';
import foto4 from '../assets/images/foto4.jpg';

// Configuración del carrusel
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '100px',
};

// Array de imágenes
const images = [
  { src: foto1, alt: "Campus view from the main entrance" },
  { src: foto2, alt: "Classroom setup with students" },
  { src: foto3, alt: "School event with students" },
  { src: foto4, alt: "School event with teachers" },
];

function Home() {
  return (
    <main className="home-main">
      <section className="home-banner">
        <div className="banner-content">
          <h1>Bienvenidos al Blog de nuestra Institución</h1>
          <p>
            Mantente al tanto de las últimas noticias, eventos y novedades en el mundo de la educación. Explora recursos valiosos y mantente conectado con nuestra comunidad de aprendizaje.
          </p>
        </div>
      </section>

      {/* Sección del carrusel */}
      <section className="home-carousel">
        <h2 className="galery-title">Galería</h2>
        <Slider {...carouselSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </section>

      <section className="home-intro">
        <h2>Nuestra institución</h2>
        <p>
          En nuestro blog, ofrecemos artículos enriquecedores y actualizaciones sobre temas educativos de relevancia, diseñados para mantenerte informado y comprometido. Descubre nuestras publicaciones más recientes y mantente conectado con la comunidad educativa para seguir aprendiendo y creciendo juntos.
        </p>
      </section>
    </main>
  );
}

export default Home;
